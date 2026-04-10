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
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';
import { WordDifficultyService } from '../../../../../core/services/word-difficulty/word-difficulty.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { TitleCasePipe } from '@angular/common';
import { capitalizeWords } from '../../../../../shared/utils/string-format.utils';

@Component({
  selector: 'app-word-suggestions-modal-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './word-suggestions-modal-form.component.html',
  styleUrl: './word-suggestions-modal-form.component.css',
})
export class WordSuggestionsModalFormComponent {
  @Input() buttonText: string = 'Confirmar';
  wordSuggestion = input<IWordSuggestionData | null>(null);

  @Output() submittedData = new EventEmitter<IFormModalComponentOutput<IWordSuggestionData>>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  form: FormGroup = this.fb.nonNullable.group({
    suggestedWord: ['', [Validators.required]],
    suggestedDifficulty: ['easy', [Validators.required]],
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

  difficulties: Signal<IWordDifficultyData[]> = this.difficultyService.difficulties;

  getInput(name: keyof IWordSuggestionData): any {
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

    const data: IWordSuggestionData = {
      suggestedWord: this.form.value.suggestedWord,
      suggestedDifficulty: this.form.value.suggestedDifficulty,
    };

    this.submittedData.emit({ value: data, cancelAction: false });
  }
}
