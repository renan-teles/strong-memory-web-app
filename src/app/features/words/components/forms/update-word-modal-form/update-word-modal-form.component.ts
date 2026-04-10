import { Component, effect, EventEmitter, inject, input, Input, Output } from '@angular/core';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { IUpdateWordData } from '../../../models/update-word-data.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IFormModalComponentOutput } from '../../../../../shared/models/form-modal-component-output.interface';
import { IWordData } from '../../../models/word-data.interface';
import { capitalizeWords } from '../../../../../shared/utils/string-format.utils';

@Component({
  selector: 'app-update-word-modal-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-word-modal-form.component.html',
  styleUrl: './update-word-modal-form.component.css',
})
export class UpdateWordModalFormComponent implements IFormUtils<IUpdateWordData> {
  @Input() buttonText: string = 'Confirmar';
  @Output() submittedData = new EventEmitter<IFormModalComponentOutput<IUpdateWordData>>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  word = input<IWordData | null>(null);

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

  getInput(name: keyof IUpdateWordData): any {
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
