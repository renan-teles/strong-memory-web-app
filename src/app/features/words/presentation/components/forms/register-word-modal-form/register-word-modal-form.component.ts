import { Component, EventEmitter, inject, Input, Output, Signal } from '@angular/core';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { WordRequest } from '../../../../data/dto/request/word-request';
import { WordDifficultyResponse } from '../../../../../word-difficulties/data/dto/response/word-difficulty-response';
import { FormModalComponentOutput } from '../../../../../../shared/types/ui/forms/form-modal-component-output.interface';
import { WordDifficultyFacade } from '../../../../../word-difficulties/presentation/state/word-difficulty.facade';
import { WordForm } from './word-form.type';
import { ModalFormUtils } from '../../../../../../shared/types/ui/forms/modal-form-utils.interface';

@Component({
  selector: 'app-register-word-modal-form',
  imports: [ReactiveFormsModule, TitleCasePipe],
  templateUrl: './register-word-modal-form.component.html',
  styleUrl: './register-word-modal-form.component.css',
})
export class RegisterWordModalFormComponent implements FormUtils<WordRequest>, ModalFormUtils {
  @Input() buttonText: string = 'Confirmar';
  @Output() submittedData = new EventEmitter<FormModalComponentOutput<WordRequest>>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly difficultyFacade = inject(WordDifficultyFacade);

  form: FormGroup = this.fb.nonNullable.group<WordForm>({
    word: this.fb.nonNullable.control('', [Validators.required]),
    difficulty: this.fb.nonNullable.control('easy', [Validators.required]),
  });

  difficulties: Signal<WordDifficultyResponse[]> = this.difficultyFacade.difficulties;

  getInput(name: keyof WordRequest): any {
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

    const word: WordRequest = {
      word: this.form.value.word!,
      difficulty: this.form.value.difficulty!,
    };

    this.submittedData.emit({ value: word, cancelAction: false });
  }
}
