import { Injectable } from '@angular/core';
import { AbstractCrudUsersUiFacade } from '../abstract-crud-users-ui.facade';
import { IUserData } from '../../../../models/user-data.interface';
import { IApiResponse } from '../../../../../../shared/models/api-response.interface';
import { ICreatedUser } from '../../../../models/created-user.interface';
import { catchError, EMPTY, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudAdministratorUiFacade extends AbstractCrudUsersUiFacade {
  override register(data: IUserData): void {
    this._registerState.update((s) => ({
      ...s,
      isRegistering: true,
      success: false,
    }));

    this.facade
      .registerAdministrator(data)
      .pipe(
        tap((response: IApiResponse<ICreatedUser>) => {
          this._registerState.update((s) => ({
            ...s,
            success: true,
          }));

          this.alert.success(response.message);
          this.router.navigate(['/auth/administrator']);
        }),

        catchError(() => {
          this._registerState.update((s) => ({
            ...s,
            success: false,
          }));
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
}
