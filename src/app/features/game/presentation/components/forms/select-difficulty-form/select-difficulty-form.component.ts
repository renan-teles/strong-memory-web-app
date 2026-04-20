import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { TitleCasePipe } from '@angular/common';
import { WordDifficultyResponse } from '../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { WordDifficultyFacade } from '../../../../../word-difficulties/presentation/state/word-difficulty.facade';
import { WordDifficultyRequest } from '../../../../../word-difficulties/data/dto/request/word-difficulty-request';

@Component({
  selector: 'app-select-difficulty-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './select-difficulty-form.component.html',
  styleUrl: './select-difficulty-form.component.css',
})
export class SelectDifficultyFormComponent implements FormUtils<WordDifficultyRequest> {
  @Output() selectedDifficulty = new EventEmitter<WordDifficultyRequest>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyFacade: WordDifficultyFacade = inject(WordDifficultyFacade);

  difficulties: Signal<WordDifficultyResponse[]> = this.difficultyFacade.difficulties;

  form: FormGroup = this.fb.nonNullable.group({
    difficulty: ['easy', [Validators.required]],
  });

  getInput(name: 'difficulty'): any {
    this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.selectedDifficulty.emit({
      difficulty: this.form.value.difficulty!,
    });
  }
}
