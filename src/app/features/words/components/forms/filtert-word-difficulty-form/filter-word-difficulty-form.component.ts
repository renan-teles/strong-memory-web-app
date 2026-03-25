import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';
import { IWordDifficultyFormData } from '../../../../../shared/models/word-difficulty-form-data.interface';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { TitleCasePipe } from '@angular/common';
import { LoadWordsPaginationUiFacade } from '../../../facades/ui/load-words-pagination/load-words-pagination-ui.facade';

@Component({
  selector: 'app-filter-word-difficulty-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent, TitleCasePipe],
  templateUrl: './filter-word-difficulty-form.component.html',
  styleUrl: './filter-word-difficulty-form.component.css',
})
export class FilterWordDifficultyFormComponent implements IFormUtils<IWordDifficultyFormData> {
  @Output() selectedDifficulty = new EventEmitter<IWordDifficultyFormData>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly paginationFacade: LoadWordsPaginationUiFacade = inject(
    LoadWordsPaginationUiFacade,
  );
  private readonly difficultyService = inject(WordDifficultService);

  isLoadingWords: Signal<boolean> = this.paginationFacade.isLoading;

  get difficults(): IWordDifficultyData[] {
    return this.difficultyService.difficults;
  }

  form: FormGroup = this.fb.nonNullable.group({
    difficulty: ['easy', [Validators.required]],
  });

  getInput(name: 'difficulty'): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.selectedDifficulty.emit({
      difficulty: this.form.value.difficulty!,
    });
  }
}
