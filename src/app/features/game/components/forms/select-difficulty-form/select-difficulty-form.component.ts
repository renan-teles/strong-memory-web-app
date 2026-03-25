import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IWordDifficultyFormData } from '../../../../../shared/models/word-difficulty-form-data.interface';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
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
  private readonly difficultyService: WordDifficultService = inject(WordDifficultService);

  get difficults(): IWordDifficultyData[] {
    return this.difficultyService.difficults;
  }

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
