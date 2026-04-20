import { Component, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { capitalizeWords } from '../../../../../../shared/utils/string-format.utils';
import { UpdateWordRequest } from '../../../../data/dto/request/update-word-request';
import { WordRequest } from '../../../../data/dto/request/word-request';
import { FormModalComponentOutput } from '../../../../../../shared/types/ui/forms/form-modal-component-output.interface';
import { ModalFormUtils } from '../../../../../../shared/types/ui/forms/modal-form-utils.interface';

@Component({
  selector: 'app-update-word-modal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-word-modal-form.component.html',
  styleUrl: './update-word-modal-form.component.css',
})
export class UpdateWordModalFormComponent implements FormUtils<UpdateWordRequest>, ModalFormUtils {
  @Input() buttonText: string = 'Confirmar';
  @Output() submittedData = new EventEmitter<FormModalComponentOutput<UpdateWordRequest>>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  word = input<WordRequest | null>(null);

  form: FormGroup = this.fb.nonNullable.group({
    word: ['', [Validators.required]],
  });

  constructor() {
    effect(() => {
      const word = this.word();
      if (!word) return;

      this.form.patchValue({
        word: capitalizeWords(word.word!),
      });
    });
  }

  getInput(name: keyof UpdateWordRequest): any {
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

    this.submittedData.emit({
      value: {
        word: this.form.value.word!,
      },
      cancelAction: false,
    });
  }
}
