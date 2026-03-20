import { Injectable, inject, signal } from '@angular/core';
import { UsersFacade } from '../users.facade';
import { IUserFormData } from '../../models/user-form-data.interface';
import { Router } from '@angular/router';
import { AlertService } from '../../../../core/services/alerts/alert.service';
import { IRegisterState } from '../../../../shared/models/register-state.interface';
import { ILoginState } from '../../models/login-state.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ICreatedUser } from '../../models/created-user.interface';
import { IApiResponse } from '../../../../shared/models/api-response.interface';
import { IAuthUser } from '../../models/auth-user-interface';
import { IUserScoreRecord } from '../../models/user-score-record.interface';
import { IUserScoreRecordState } from '../../models/user-score-record-state.interface';
import { IUpdatePasswordFormData } from '../../models/update-password-form-data.interface';
import { IUpdateState } from '../../../../shared/models/update-state.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersUiFacade {
  private readonly usersFacade = inject(UsersFacade);
  private readonly alert = inject(AlertService);
  private readonly router = inject(Router);

  readonly registerState = signal<IRegisterState>({
    isRegistering: false,
    registerSuccess: false,
  });

  readonly loginState = signal<ILoginState>({
    isAuthenticating: false,
    loginSuccess: false,
  });

  readonly userScoreRecordState = signal<IUserScoreRecordState>({
    isGetting: false,
    scores: [],
  });

  readonly updatePasswordState = signal<IUpdateState>({
    isUpdatting: false,
    updateSuccess: false,
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

  getPlayerSocreRecords(): void {
    this.userScoreRecordState.update((s) => ({
      ...s,
      isGetting: true,
    }));

    this.usersFacade
      .getPlayerSocreRecords()
      .pipe(
        tap((response: IApiResponse<IUserScoreRecord[]>) => {
          this.userScoreRecordState.update((s) => ({
            ...s,
            scores: response.data!,
          }));
        }),
        finalize(() => {
          this.userScoreRecordState.update((s) => ({
            ...s,
            isGetting: false,
          }));
        }),
      )
      .subscribe();
  }

  updatePlayerPassword(data: IUpdatePasswordFormData): void {
    this.updatePasswordState.update((s) => ({
      ...s,
      isUpdatting: true,
    }));

    this.usersFacade
      .updatePlayerPassword(data)
      .pipe(
        tap(() => {
          this.updatePasswordState.update((s) => ({
            ...s,
            updateSuccess: true,
          }));

          this.alert.success('Senha atualizada com sucesso.');
          this.alert.timeoutToClear();
        }),
        catchError(() => {
          this.updatePasswordState.update((s) => ({
            ...s,
            updateSuccess: false,
          }));
          this.alert.error('Erro ao atualizar senha.');
          this.alert.timeoutToClear();
          return EMPTY;
        }),
        finalize(() => {
          this.updatePasswordState.update((s) => ({
            ...s,
            isUpdatting: false,
          }));
        }),
      )
      .subscribe();
  }

  resetUpdatePasswordState(): void {
    this.updatePasswordState.update((s) => ({
      ...s,
      updateSuccess: false,
      isUpdatting: false,
    }));
  }

  private setErrorAlert<T>(errorBody: IApiResponse<T>): void {
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
