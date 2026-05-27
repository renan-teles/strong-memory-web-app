import { Component, effect, EffectRef, inject, OnDestroy, signal, Signal } from '@angular/core';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { AuthUserFormCardComponent } from '../../components/cards/auth-user-form/auth-user-form-card.component';
import { UserRequest } from '../../../../users/data/dto/request/user-request';
import { AlertUtils } from '../../../../../shared/types/ui/alert/alert-utils.interface';
import { parseUserRequestToRegisterUserRequest } from '../../../../users/data/mappers/user-mapper';
import { RegisterApiFacade } from '../../state/register/register-api.facade';
import { LoginApiFacade } from '../../state/login/api/login-api.facade';

@Component({
  selector: 'app-auth-user',
  imports: [AuthUserFormCardComponent],
  templateUrl: './auth-user.page.html',
  styleUrl: './auth-user.page.css',
})
export class AuthUserPage implements AlertUtils, OnDestroy {
  private readonly loginApi: LoginApiFacade = inject(LoginApiFacade);
  private readonly registerApi: RegisterApiFacade = inject(RegisterApiFacade);
  private readonly alertService: AlertService = inject(AlertService);

  isRegisteringUser: Signal<boolean> = this.registerApi.isRegistering;
  registerUserSuccess: Signal<boolean> = this.registerApi.registerSuccess;

  readonly _isLoginRole = signal<boolean>(true);
  isLoginRole: Signal<boolean> = this._isLoginRole.asReadonly();

  readonly _isAdminRole = signal<boolean>(false);
  isAdminRole: Signal<boolean> = this._isAdminRole.asReadonly();

  private readonly setToLoginRoleEffect: EffectRef = effect(() => {
    if (!this.isRegisteringUser() && this.registerUserSuccess()) {
      this._isLoginRole.set(true);
    }
  });

  ngOnDestroy(): void {
    this.closeAlert();
  }

  loginPlayer(data: UserRequest): void {
    this.loginApi.loginPlayer(data);
  }

  registerPlayer(data: UserRequest): void {
    this.registerApi.registerPlayer(parseUserRequestToRegisterUserRequest(data));
  }

  loginAdmin(data: UserRequest): void {
    this.loginApi.loginAdministrator(data);
  }

  registerAdmin(data: UserRequest): void {
    this.registerApi.registerAdministrator(parseUserRequestToRegisterUserRequest(data));
  }

  toggleLoginRole(): void {
    this._isLoginRole.update((value) => !value);
  }

  togglePlayerRole(): void {
    this._isAdminRole.update((value) => !value);
  }

  closeAlert(): void {
    this.alertService.clear();
  }
}
