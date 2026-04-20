import { FormControl } from '@angular/forms';

export type AuthForm = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
};
