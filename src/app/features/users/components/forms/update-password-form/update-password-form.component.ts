import { Component, effect, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUpdatePasswordFormData } from '../../../models/update-password-form-data.interface';
import { UsersUiFacade } from '../../../facades/ui/users-ui.facade';
import { SpinnerBorderComponent } from '../../../../../shared/components/spinner-border/spinner-border.component';
import { IUpdatePasswordFormInputs } from '../../../models/update-password-form-inputs.interface';

export function passwordMatchValidator(control: AbstractControl) {
  const parent = control.parent;

  if (!parent) return null;

  const newPassword = parent.get('newPassword')?.value;
  const confirmNewPassword = control.value;

  if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
    return { passwordMismatch: true };
  }

  return null;
}

@Component({
  selector: 'app-update-password-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './update-password-form.component.html',
  styleUrl: './update-password-form.component.css',
})
export class UpdatePasswordFormComponent implements OnInit {
  @Output() passwordData = new EventEmitter<IUpdatePasswordFormData>();

  private readonly fb = inject(FormBuilder);
  private readonly ui = inject(UsersUiFacade);

  private resetFormEffect = effect(() => {
    const state = this.updatePassword();
    if (state.updateSuccess && !state.isUpdatting) {
      this.form.reset();
      this.ui.resetUpdatePasswordState();
    }
  });

  updatePassword = this.ui.updatePasswordState;

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

  getInput(name: keyof IUpdatePasswordFormInputs) {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: IUpdatePasswordFormData = {
      currentPassword: this.form.value.currentPassword!,
      newPassword: this.form.value.newPassword!,
    };

    this.passwordData.emit(data);
  }
}
