import { AbstractControl } from '@angular/forms';

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
