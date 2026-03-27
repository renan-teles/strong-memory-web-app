import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IFilterWordSuggestionFormData } from '../../../models/filter-word-suggestion-form-data.interface';
import { LoadWordSuggestionsFacade } from '../../../facades/ui/load-word-suggestions/load-word-suggestions-ui.facade';

@Component({
  selector: 'app-filter-word-suggestions-form',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-word-suggestions-form.component.html',
  styleUrl: './filter-word-suggestions-form.component.css',
})
export class FilterWordSuggestionsFormComponent implements IFormUtils<IFilterWordSuggestionFormData> {
  @Output() submitteData = new EventEmitter<IFilterWordSuggestionFormData>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly facade: LoadWordSuggestionsFacade = inject(LoadWordSuggestionsFacade);

  isLoadingSuggestions: Signal<boolean> = this.facade.isLoading;

  form: FormGroup = this.fb.nonNullable.group({
    startDate: [this.getDateToday(), [Validators.required]],
    endDate: [this.getDateToday(), [Validators.required]],
  });

  getInput(name: keyof IFilterWordSuggestionFormData) {
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
