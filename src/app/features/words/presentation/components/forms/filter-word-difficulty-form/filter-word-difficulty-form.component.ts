import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { WordDifficultyResponse } from '../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { SpinnerBorderComponent } from '../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { LoadWordsPaginationFacade } from '../../../state/load-words-pagination/load-words-pagination.facade';
import { WordDifficultyFacade } from '../../../../../word-difficulties/presentation/state/word-difficulty.facade';
import { WordDifficultyRequest } from '../../../../../word-difficulties/data/dto/request/word-difficulty-request';

@Component({
  selector: 'app-filter-word-difficulty-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent, TitleCasePipe],
  templateUrl: './filter-word-difficulty-form.component.html',
  styleUrl: './filter-word-difficulty-form.component.css',
})
export class FilterWordDifficultyFormComponent implements FormUtils<WordDifficultyRequest> {
  @Output() selectedDifficulty = new EventEmitter<WordDifficultyRequest>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly paginationFacade: LoadWordsPaginationFacade = inject(LoadWordsPaginationFacade);
  private readonly difficultyFacade: WordDifficultyFacade = inject(WordDifficultyFacade);

  isLoadingWords: Signal<boolean> = this.paginationFacade.isLoading;

  difficulties: Signal<WordDifficultyResponse[]> = this.difficultyFacade.difficulties;

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
