import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { capitalizeWords } from '../../../../../../../shared/utils/string-format.utils';
import { WordSuggestionRequest } from '../../../../../data/dto/request/word-suggestion-request';
import { WordDifficultyResponse } from '../../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { FormModalComponentOutput } from '../../../../../../../shared/types/ui/forms/form-modal-component-output.interface';
import { WordDifficultyFacade } from '../../../../../../word-difficulties/presentation/state/word-difficulty.facade';
import { WordSuggestionsForm } from '../word-suggestions-form.type';
import { FormUtils } from '../../../../../../../shared/types/ui/forms/form-utils.interface';
import { ModalFormUtils } from '../../../../../../../shared/types/ui/forms/modal-form-utils.interface';

@Component({
  selector: 'app-word-suggestions-modal-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './word-suggestions-modal-form.component.html',
  styleUrl: './word-suggestions-modal-form.component.css',
})
export class WordSuggestionsModalFormComponent
  implements FormUtils<WordSuggestionsForm>, ModalFormUtils
{
  @Input() buttonText: string = 'Confirmar';
  wordSuggestion = input<WordSuggestionRequest | null>(null);

  @Output() submittedData = new EventEmitter<FormModalComponentOutput<WordSuggestionRequest>>();

  private readonly difficultyFacade = inject(WordDifficultyFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);

  form: FormGroup = this.fb.nonNullable.group<WordSuggestionsForm>({
    suggestedWord: this.fb.nonNullable.control('', [Validators.required]),
    suggestedDifficulty: this.fb.nonNullable.control('easy', [Validators.required]),
  });

  constructor() {
    effect(() => {
      const suggestion = this.wordSuggestion();
      if (!suggestion) return;

      this.form.patchValue({
        suggestedWord: capitalizeWords(suggestion.suggestedWord!),
        suggestedDifficulty: suggestion.suggestedDifficulty!,
      });
    });
  }

  difficulties: Signal<WordDifficultyResponse[]> = this.difficultyFacade.difficulties;

  getInput(name: keyof WordSuggestionsForm): any {
    return this.form.get(name);
  }

  cancelAction(): void {
    this.submittedData.emit({ cancelAction: true });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: WordSuggestionRequest = {
      suggestedWord: this.form.value.suggestedWord,
      suggestedDifficulty: this.form.value.suggestedDifficulty,
    };

    this.submittedData.emit({ value: data, cancelAction: false });
  }
}
