import { computed, Injectable, Signal, signal } from '@angular/core';
import { AbstractUsersUiFacade } from '../abstract-users-ui.facade';
import { IUserData } from '../../../models/user-data.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ILoginState } from '../../../models/login-state.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthUsersUiFacade extends AbstractUsersUiFacade {
  constructor() {
    super();
  }

  private readonly _loginState = signal<ILoginState>({
    isAuthenticating: false,
    success: false,
  });

  readonly isAuthenticating: Signal<boolean> = computed(() => {
    return this._loginState().isAuthenticating;
  });

  readonly success: Signal<boolean> = computed(() => {
    return this._loginState().success;
  });

  authPlayer(data: IUserData): void {
    this._loginState.update((s) => ({
      ...s,
      isAuthenticating: true,
      success: false,
    }));

    this.facade
      .loginPlayer(data)
      .pipe(
        tap(() => {
          this._loginState.update((s) => ({
            ...s,
            success: true,
          }));
          this.redirectTo('/game/start');
        }),

        catchError((error: HttpErrorResponse) => {
          this._loginState.update((s) => ({
            ...s,
            success: false,
          }));

          this.alert.error(error.error.message);
          return EMPTY;
        }),

        finalize(() => {
          this._loginState.update((s) => ({
            ...s,
            isAuthenticating: false,
          }));
        }),
      )
      .subscribe();
  }
}
