import { Injectable, inject, signal } from '@angular/core';
import { UsersFacade } from '../users.facade';
import { IUserFormData } from '../../models/user-form-data.interface';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IRegisterState } from '../../../../shared/models/register-state.interface';
import { ILoginState } from '../../../../shared/models/login-state.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ICreatedUser } from '../../models/created-user.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IAuthUser } from '../../models/auth-user-interface';

@Injectable({
  providedIn: 'root',
})
export class UsersUiFacade {
  private readonly usersFacade = inject(UsersFacade);
  private readonly router = inject(Router);
  private readonly alert = inject(AlertService);

  readonly registerState = signal<IRegisterState>({
    isRegistering: false,
    registerSuccess: false,
  });

  readonly loginState = signal<ILoginState>({
    isAuthenticating: false,
    loginSuccess: false,
  });

  registerPlayer(data: IUserFormData): void {
    this.registerState.update((s) => ({
      ...s,
      isRegistering: true,
      registerSuccess: false,
    }));

    this.usersFacade
      .registerPlayer(data)
      .pipe(
        tap((response: IApiResponse<ICreatedUser>) => {
          this.registerState.update((s) => ({
            ...s,
            registerSuccess: true,
          }));
          this.alert.success(response.message);
          this.alert.timeoutToClear();
          this.redirectPlayerToLogin();
        }),

        catchError((error: HttpErrorResponse) => {
          this.registerState.update((s) => ({
            ...s,
            registerSuccess: false,
          }));
          this.setErrorAlert<ICreatedUser>(error.error);
          return EMPTY;
        }),

        finalize(() => {
          this.registerState.update((s) => ({
            ...s,
            isRegistering: false,
          }));
        }),
      )
      .subscribe();
  }

  loginPlayer(data: IUserFormData): void {
    this.loginState.update((s) => ({
      ...s,
      isAuthenticating: true,
      loginSuccess: false,
    }));

    this.usersFacade
      .loginPlayer(data)
      .pipe(
        tap(() => {
          this.loginState.update((s) => ({
            ...s,
            loginSuccess: true,
          }));
          this.redirectToStartGame();
        }),

        catchError((error: HttpErrorResponse) => {
          this.loginState.update((s) => ({
            ...s,
            loginSuccess: false,
          }));
          this.setErrorAlert<IAuthUser>(error.error);
          return EMPTY;
        }),

        finalize(() => {
          this.loginState.update((s) => ({
            ...s,
            isAuthenticating: false,
          }));
        }),
      )
      .subscribe();
  }

  private setErrorAlert <T> (errorBody: IApiResponse<T>): void {
    this.alert.error(errorBody.message);
    this.alert.timeoutToClear();
  }

  private redirectPlayerToLogin(): void {
    this.router.navigate(['/player/login']);
  }

  private redirectToStartGame(): void {
    this.router.navigate(['/game/start']);
  }
}
