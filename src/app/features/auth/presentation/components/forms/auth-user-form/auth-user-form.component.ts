import { Component, EventEmitter, inject, Input, OnInit, Output, Signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../../../../shared/types/ui/forms/form-utils.interface';
import { UserRequest } from '../../../../../users/data/dto/request/user-request';
import { SpinnerBorderComponent } from '../../../../../../shared/ui/components/spinner-border/spinner-border.component';
import { AuthForm } from './auth-form.type';
import { LoginApiFacade } from '../../../state/login/api/login-api.facade';
import { RegisterApiFacade } from '../../../state/register/register-api.facade';

@Component({
  selector: 'app-auth-user-form',
  imports: [ReactiveFormsModule, SpinnerBorderComponent],
  templateUrl: './auth-user-form.component.html',
  styleUrl: './auth-user-form.component.css',
})
export class AuthUserFormComponent implements OnInit, FormUtils<AuthForm> {
  @Input({ required: true }) isAdminRole: boolean = false;
  @Input({ required: true }) isLoginRole: boolean = true;

  @Output() userData = new EventEmitter<UserRequest>();

  private readonly fb: FormBuilder = inject(FormBuilder);

  private readonly registerFacade: RegisterApiFacade = inject(RegisterApiFacade);
  private readonly loginFacade: LoginApiFacade = inject(LoginApiFacade);

  isRegisteringUser: Signal<boolean> = this.registerFacade.isRegistering;
  isAuthenticatingUser: Signal<boolean> = this.loginFacade.isAuthenticating;

  form = this.fb.nonNullable.group<AuthForm>({
    username: this.fb.nonNullable.control(''),
    email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(7)]),
  });

  ngOnInit(): void {
    const usernameControl = this.form.controls.username;

    if (this.isLoginRole) {
      usernameControl.clearValidators();
    } else {
      usernameControl.setValidators([Validators.required]);
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
      username: this.isLoginRole ? undefined : username,
      email,
      password,
    };

    this.userData.emit(data);
  }
}
