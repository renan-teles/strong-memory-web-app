import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { TitleCasePipe } from '@angular/common';
import { WordDifficultyResponse } from '../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyService } from '../../../../../word-difficulties/presentation/services/word-difficulty/word-difficulty.service';
import { MatchDifficultyDataForm } from './match-difficulty-data-form';

@Component({
  selector: 'app-match-difficulty-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './match-difficulty-form.component.html',
  styleUrl: './match-difficulty-form.component.css',
})
export class MatchDifficultyFormComponent implements FormUtils<MatchDifficultyDataForm> {
  @Output() selectedDifficulty = new EventEmitter<MatchDifficultyDataForm>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  form: FormGroup = this.fb.nonNullable.group({
    difficulty: [WordDifficultyService.INITIAL_DIFFICULTY_NAME, [Validators.required]],
    isInfiniteMode: [false],
  });

  get difficulties(): WordDifficultyResponse[] {
    return this.difficultyService.difficulties;
  }

  getInput(name: 'difficulty'): any {
    this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.selectedDifficulty.emit({
      difficulty: this.form.value.difficulty!,
      isInfiniteMode: this.form.value.isInfiniteMode!,
    });
  }
}
