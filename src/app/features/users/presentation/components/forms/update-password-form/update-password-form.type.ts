import { FormControl } from '@angular/forms';

export type UpdatePasswordForm = {
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmNewPassword: FormControl<string>;
};
