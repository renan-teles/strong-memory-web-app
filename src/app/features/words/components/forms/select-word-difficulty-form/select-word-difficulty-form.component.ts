import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';
import { IWordDifficultyData } from '../../../models/word-difficulty-data.interface';
import { FindWordsPaginationUiFacade } from '../../../facades/ui/find-words-pagination/find-words-pagination-ui.facade';

@Component({
  selector: 'app-select-word-difficulty-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './select-word-difficulty-form.component.html',
  styleUrl: './select-word-difficulty-form.component.css',
})
export class SelectWordDifficultyFormComponent implements IFormUtils<IWordDifficultyData> {
  @Output() selectedDifficulty = new EventEmitter<IWordDifficultyData>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly facade: FindWordsPaginationUiFacade = inject(FindWordsPaginationUiFacade);

  isFindingWords: Signal<boolean> = this.facade.isFinding;

  form: FormGroup = this.fb.nonNullable.group({
    difficulty: ['easy', [Validators.required]],
  });

  getInput(name: 'difficulty'): any {
    this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.selectedDifficulty.emit({
      difficulty: this.form.value.difficulty!,
    });
  }
}
