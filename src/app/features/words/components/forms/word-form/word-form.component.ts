import { Component, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IWordData } from '../../../models/word-data.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IWordDifficultyData } from '../../../../../shared/models/word-difficulty-data.interface';
import { WordDifficultService } from '../../../../../core/services/word-difficult/word-difficult.service';
import { TitleCasePipe } from '@angular/common';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';

@Component({
  selector: 'app-word-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './word-form.component.html',
  styleUrl: './word-form.component.css',
})
export class WordFormComponent implements IFormUtils<IWordData> {
  @Input() buttonText: string = 'Confirmar';
  word = input<IWordData | null>(null);

  @Output() submittedData = new EventEmitter<IFormModalComponentOutput<IWordData>>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyService = inject(WordDifficultService);

  form: FormGroup = this.fb.nonNullable.group({
    word: ['', [Validators.required]],
    difficulty: ['easy', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const word = this.word();
      if (!word) return;

      this.form.patchValue({
        word: word.word!,
        difficulty: word.difficulty!,
      });
    });
  }

  get difficults(): IWordDifficultyData[] {
    return this.difficultyService.difficults;
  }

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
