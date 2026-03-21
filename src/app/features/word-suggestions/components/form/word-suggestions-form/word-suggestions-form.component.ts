import { Component, effect, EffectRef, EventEmitter, inject, Output, Signal } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IWordSuggestionData } from '../../../models/word-suggestion-data.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CrudWordSuggestionsUiFacade } from '../../../facades/ui/crud/crud-word-suggestions-ui.facade.ts';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';

@Component({
  selector: 'app-word-suggestions-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './word-suggestions-form.component.html',
  styleUrl: './word-suggestions-form.component.css',
})
export class WordSuggestionsFormComponent implements IFormUtils<IWordSuggestionData> {
  @Output() suggestionsData = new EventEmitter<IWordSuggestionData>();

  private readonly facade: CrudWordSuggestionsUiFacade = inject(CrudWordSuggestionsUiFacade);
  private readonly fb: FormBuilder = inject(FormBuilder);

  isRegisteringWord: Signal<boolean> = this.facade.isRegistering;
  registerSuccess: Signal<boolean> = this.facade.registerSuccess;

  private resetFormEffect: EffectRef = effect(() => {
    if (this.registerSuccess() && !this.isRegisteringWord()) {
      this.form.reset();
      this.facade.resetRegisterState();
    }
  });

  form: FormGroup = this.fb.nonNullable.group({
    suggestedWord: ['', [Validators.required, Validators.minLength(2)]],
    suggestedDifficulty: ['easy', [Validators.required]],
  });

  getInput(name: keyof IWordSuggestionData): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.suggestionsData.emit({
      suggestedDifficulty: this.form.value.suggestedDifficulty!,
      suggestedWord: this.form.value.suggestedWord!,
    });
  }
}
