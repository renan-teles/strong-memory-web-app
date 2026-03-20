import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IWordSuggestionFormData } from '../../../models/word-suggestion-form-data.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { WordSuggestionsUiFacade } from '../../../facades/ui/word-suggestions-ui.facade.ts';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';

@Component({
  selector: 'app-word-suggestions-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './word-suggestions-form.component.html',
  styleUrl: './word-suggestions-form.component.css',
})
export class WordSuggestionsFormComponent implements IFormUtils<IWordSuggestionFormData> {
  @Output() suggestionsData = new EventEmitter<IWordSuggestionFormData>();

  private readonly ui = inject(WordSuggestionsUiFacade);
  private readonly fb = inject(FormBuilder);

  private resetFormEffect = effect(() => {
    const state = this.registerState();
    if (state.registerSuccess && !state.isRegistering) {
      this.form.reset();
      this.ui.resetRegisterState();
    }
  });

  registerState = this.ui.registerState;

  form = this.fb.nonNullable.group({
    suggestedWord: ['', [Validators.required, Validators.minLength(2)]],
    suggestedDifficulty: ['easy', [Validators.required]],
  });

  getInput(name: keyof IWordSuggestionFormData) {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IWordSuggestionFormData = {
      suggestedDifficulty: this.form.value.suggestedDifficulty!,
      suggestedWord: this.form.value.suggestedWord!,
    };

    this.suggestionsData.emit(data);
  }
}
