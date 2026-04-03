import { Component, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IWordDifficultyFormData } from '../../../../../shared/models/word-difficulty-form-data.interface';
import { WordDifficultyService } from '../../../../../core/services/word-difficulty/word-difficulty.service';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-select-difficulty-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './select-difficulty-form.component.html',
  styleUrl: './select-difficulty-form.component.css',
})
export class SelectDifficultyFormComponent implements IFormUtils<IWordDifficultyFormData> {
  @Output() selectedDifficulty = new EventEmitter<IWordDifficultyFormData>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyService: WordDifficultyService = inject(WordDifficultyService);

  difficulties: Signal<IWordDifficultyData[]> = this.difficultyService.difficulties;

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
