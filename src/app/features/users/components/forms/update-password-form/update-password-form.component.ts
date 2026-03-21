import {
  Component,
  effect,
  EffectRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUpdatePasswordData } from '../../../models/update-password-data.interface';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';
import { IUpdatePasswordFormInputs } from '../../../models/update-password-form-inputs.interface';
import { IFormUtils } from '../../../../../shared/models/form-utils.interface';
import { passwordMatchValidator } from '../../../../../shared/validators/password-math.validator';
import { CrudPlayerUiFacade } from '../../../facades/ui/crud/player/crud-player-ui.facade';

@Component({
  selector: 'app-update-password-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css',
})
export class UpdatePasswordFormComponent implements OnInit, IFormUtils<IUpdatePasswordFormInputs> {
  @Output() passwordData = new EventEmitter<IUpdatePasswordData>();

  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly crudFacade: CrudPlayerUiFacade = inject(CrudPlayerUiFacade);

  private resetFormEffect: EffectRef = effect(() => {
    if (this.updatePasswordSuccess() && !this.isUpdatingPassword()) {
      this.form.reset();
      this.crudFacade.resetUpdatePasswordState();
    }
  });

  isUpdatingPassword: Signal<boolean> = this.crudFacade.isUpdatingPassword;
  updatePasswordSuccess: Signal<boolean> = this.crudFacade.updatePasswordSuccess;

  form = this.fb.nonNullable.group({
    currentPassword: ['', [Validators.required, Validators.minLength(7)]],
    newPassword: ['', [Validators.required, Validators.minLength(7)]],
    confirmNewPassword: [
      '',
      [Validators.required, Validators.minLength(7), passwordMatchValidator],
    ],
  });

  ngOnInit(): void {
    this.form.get('newPassword')?.valueChanges.subscribe(() => {
      this.form.get('confirmNewPassword')?.updateValueAndValidity();
    });
  }

  getInput(name: keyof IUpdatePasswordFormInputs): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.passwordData.emit({
      currentPassword: this.form.value.currentPassword!,
      newPassword: this.form.value.newPassword!,
    });
  }
}
