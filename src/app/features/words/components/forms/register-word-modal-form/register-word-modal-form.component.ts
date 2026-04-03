import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IWordData } from '../../../models/word-data.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { WordDifficultyService } from '../../../../../core/services/word-difficulty/word-difficulty.service';
import { TitleCasePipe } from '@angular/common';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';

@Component({
  selector: 'app-register-word-modal-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './register-word-modal-form.component.html',
  styleUrl: './register-word-modal-form.component.css',
})
export class RegisterWordModalFormComponent implements IFormUtils<IWordData> {
  @Input() buttonText: string = 'Confirmar';
  @Output() submittedData = new EventEmitter<IFormModalComponentOutput<IWordData>>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyService = inject(WordDifficultyService);

  form: FormGroup = this.fb.nonNullable.group({
    word: ['', [Validators.required]],
    difficulty: ['easy', [Validators.required]],
  });

  difficulties: Signal<IWordDifficultyData[]> = this.difficultyService.difficulties;

  getInput(name: keyof IWordData): any {
    return this.form.get(name);
  }

  cancelAction(): void {
    this.submittedData.emit({ cancelAction: true });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const word: IWordData = {
      word: this.form.value.word!,
      difficulty: this.form.value.difficulty!,
    };

    this.submittedData.emit({ value: word, cancelAction: false });
  }
}
