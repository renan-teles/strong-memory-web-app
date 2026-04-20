import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  Signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { UserRequest } from '../../../../../users/data/dto/request/user-request';
import { SpinnerBorderComponent } from '../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { LoginFacade } from '../../../state/login/login.facade';
import { RegisterFacade } from '../../../state/register/register.facade';
import { AUTH_FORM_CONFIG } from './auth-form.config';
import { AuthForm } from './auth-form.type';
import { AuthFormRole } from './auth-form-role.type';
import { RedirectFormLink } from '../../../../../../shared/types/ui/forms/redirect-form-link.interface';

@Component({
  selector: 'app-auth-user-form',
  imports: [RouterLink, ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './auth-user-form.component.html',
  styleUrl: './auth-user-form.component.css',
})
export class AuthUserFormComponent implements OnInit, FormUtils<AuthForm> {
  @Input({ required: true }) formRole: AuthFormRole = 'register-player';
  @Input({ required: true }) isRegisterRole: boolean = true;

  @Output() userData = new EventEmitter<UserRequest>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  private readonly registerFacade: RegisterFacade = inject(RegisterFacade);
  private readonly loginFacade: LoginFacade = inject(LoginFacade);

  readonly showLinks: Signal<boolean> = computed(
    () => !(this.isRegisteringUser() || this.isAuthenticatingUser()),
  );

  readonly link: Signal<RedirectFormLink | null> = computed(() => {
    if (!this.showLinks()) return null;
    return AUTH_FORM_CONFIG[this.formRole]?.link ?? null;
  });

  readonly linkInversorRole: Signal<RedirectFormLink | null> = computed(() => {
    if (!this.showLinks()) return null;
    return AUTH_FORM_CONFIG[this.formRole]?.inverseLink ?? null;
  });

  isRegisteringUser: Signal<boolean> = this.registerFacade.isRegistering;
  isAuthenticatingUser: Signal<boolean> = this.loginFacade.isAuthenticating;

  form = this.fb.nonNullable.group<AuthForm>({
    username: this.fb.nonNullable.control(''),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(7)]),
  });

  ngOnInit(): void {
    const usernameControl = this.form.controls.username;

    if (this.isRegisterRole) {
      usernameControl.setValidators([Validators.required]);
    } else {
      usernameControl.clearValidators();
    }

    usernameControl.updateValueAndValidity();
  }

  getInput(name: keyof AuthForm): any {
    return this.form.get(name);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.form.getRawValue();
    const data: UserRequest = {
      username: this.isRegisterRole ? username : undefined,
      email,
      password,
    };

    this.userData.emit(data);
  }
}
