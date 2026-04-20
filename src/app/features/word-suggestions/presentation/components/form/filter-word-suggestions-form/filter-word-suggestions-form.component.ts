import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { FilterWordSuggestionRequest } from '../../../../data/dto/request/filter-word-suggestion-request';
import { LoadWordSuggestionsFacade } from '../../../state/load-word-suggestions/load-word-suggestions.facade';
import { FilterWordSuggestionsForm } from './filter-word-suggestions-form.type';

@Component({
  selector: 'app-filter-word-suggestions-form',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-word-suggestions-form.component.html',
  styleUrl: './filter-word-suggestions-form.component.css',
})
export class FilterWordSuggestionsFormComponent implements FormUtils<FilterWordSuggestionsForm> {
  @Output() submitteData = new EventEmitter<FilterWordSuggestionRequest>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly facade: LoadWordSuggestionsFacade = inject(LoadWordSuggestionsFacade);

  isLoadingSuggestions: Signal<boolean> = this.facade.isLoading;

  form: FormGroup = this.fb.nonNullable.group<FilterWordSuggestionsForm>({
    startDate: this.fb.nonNullable.control(this.getDateToday(), [Validators.required]),
    endDate: this.fb.nonNullable.control(this.getDateToday(), [Validators.required]),
  });

  getInput(name: keyof FilterWordSuggestionsForm) {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitteData.emit({
      startDate: this.form.value.startDate!,
      endDate: this.form.value.endDate!,
    });
  }

  private getDateToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
