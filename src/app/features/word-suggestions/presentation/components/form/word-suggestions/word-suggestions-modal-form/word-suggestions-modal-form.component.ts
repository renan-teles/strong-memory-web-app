import { Component, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { capitalizeWords } from '../../../../../../../shared/utils/string-format.utils';
import { WordSuggestionRequest } from '../../../../../data/dto/request/word-suggestion-request';
import { WordDifficultyResponse } from '../../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { FormModalComponentOutput } from '../../../../../../../shared/types/ui/forms/form-modal-component-output.interface';
import { WordSuggestionsForm } from '../word-suggestions-form.type';
import { FormUtils } from '../../../../../../../shared/types/ui/forms/form-utils.interface';
import { ModalFormUtils } from '../../../../../../../shared/types/ui/forms/modal-form-utils.interface';
import { WordDifficultyService } from '../../../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { TitleCasePipe } from '@angular/common';

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

  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);
  private readonly fb: FormBuilder = inject(FormBuilder);

  form: FormGroup = this.fb.nonNullable.group<WordSuggestionsForm>({
    suggestedWord: this.fb.nonNullable.control({ value: '', disabled: true }, [
      Validators.required,
    ]),
    suggestedDifficulty: this.fb.nonNullable.control(
      WordDifficultyService.INITIAL_DIFFICULTY_NAME,
      [Validators.required],
    ),
  });

  constructor() {
    effect(() => {
      const suggestion = this.wordSuggestion();
      if (!suggestion) return;

      this.form.patchValue({
        suggestedWord: capitalizeWords(suggestion.word!),
        suggestedDifficulty: suggestion.difficulty!,
      });
    });
  }

  get difficulties(): WordDifficultyResponse[] {
    return this.difficultyService.difficulties;
  }

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

    const suggestion = this.wordSuggestion();
    const data: WordSuggestionRequest = {
      word: suggestion!.word,
      difficulty: this.form.value.suggestedDifficulty,
    };

    console.log(data);

    this.submittedData.emit({ value: data, cancelAction: false });
  }
}
