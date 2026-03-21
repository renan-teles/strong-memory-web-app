import { Injectable } from '@angular/core';
import { IApiResponse } from '../../../../../../shared/models/api-response.interface';
import { IUserData } from '../../../../models/user-data.interface';
import { ICreatedUser } from '../../../../models/created-user.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUpdatePasswordData } from '../../../../models/update-password-data.interface';
import { AbstractCrudUsersUiFacade } from '../abstract-crud-users-ui.facade';

@Injectable({
  providedIn: 'root',
})
export class CrudPlayerUiFacade extends AbstractCrudUsersUiFacade {
  constructor() {
    super();
  }

  register(data: IUserData): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: true,
      registerSuccess: false,
    }));

    this.facade
      .registerPlayer(data)
      .pipe(
        tap((response: IApiResponse<ICreatedUser>) => {
          this._registerState.update((s) => ({
            ...s,
            registerSuccess: true,
          }));
          this.alert.success(response.message).startTimeoutToClear();
          this.redirectTo('/player/login');
        }),

        catchError((error: HttpErrorResponse) => {
          this._registerState.update((s) => ({
            ...s,
            registerSuccess: false,
          }));
          this.alert.error(error.error.message).startTimeoutToClear();
          return EMPTY;
        }),

        finalize(() => {
          this._registerState.update((s) => ({
            ...s,
            isRegistering: false,
          }));
        }),
      )
      .subscribe();
  }

  updatePassword(data: IUpdatePasswordData): void {
    this._updatePasswordState.update((s) => ({
      ...s,
      isUpdating: true,
    }));

    this.facade
      .updatePlayerPassword(data)
      .pipe(
        tap(() => {
          this._updatePasswordState.update((s) => ({
            ...s,
            updateSuccess: true,
          }));

          this.alert.success('Senha atualizada com sucesso.').startTimeoutToClear();
        }),
        catchError(() => {
          this._updatePasswordState.update((s) => ({
            ...s,
            updateSuccess: false,
          }));
          this.alert.error('Erro ao atualizar senha.').startTimeoutToClear();
          return EMPTY;
        }),
        finalize(() => {
          this._updatePasswordState.update((s) => ({
            ...s,
            isUpdating: false,
          }));
        }),
      )
      .subscribe();
  }
}
