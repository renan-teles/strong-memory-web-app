import { Component, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { TitleCasePipe } from '@angular/common';

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
  private readonly difficultyService: WordDifficultService = inject(WordDifficultService);

  form: FormGroup = this.fb.nonNullable.group({
    suggestedWord: ['', [Validators.required]],
    suggestedDifficulty: ['easy', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const suggestion = this.wordSuggestion();
      console.log(suggestion);
      if (!suggestion) return;

      this.form.patchValue({
        suggestedWord: suggestion.suggestedWord!,
        suggestedDifficulty: suggestion.suggestedDifficulty!,
      });
    });
  }

  get difficults(): IWordDifficultyData[] {
    return this.difficultyService.difficults;
  }

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
