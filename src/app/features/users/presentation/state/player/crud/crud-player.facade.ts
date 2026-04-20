import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { RequestState } from '../../../../../../shared/types/api/request-state.interface';
import { catchError, EMPTY, tap } from 'rxjs';
import { setStatusRequestState } from '../../../../../../shared/utils/request-state.utils';
import { UpdatePasswordRequest } from '../../../../data/dto/request/update-password-request';
import { PlayerApiService } from '../../../../data/services/users-api/player/player-api.service';
import { AlertService } from '../../../../../../shared/services/alert/alert.service';

@Injectable({
  providedIn: 'root',
})
export class CrudPlayerFacade {
  private readonly api: PlayerApiService = inject(PlayerApiService);
  protected readonly alert: AlertService = inject(AlertService);

  protected readonly _updatePasswordState = signal<RequestState<void>>({
    status: 'idle',
  });

  readonly isUpdatingPassword: Signal<boolean> = computed(
    () => this._updatePasswordState().status === 'loading',
  );
  readonly updatePasswordSuccess: Signal<boolean> = computed(
    () => this._updatePasswordState().status === 'success',
  );

  updatePassword(data: UpdatePasswordRequest): void {
    setStatusRequestState(this._updatePasswordState, 'loading');

    this.api
      .updatePassword(data)
      .pipe(
        tap(() => {
          setStatusRequestState(this._updatePasswordState, 'success');
          this.alert.success('Senha atualizada com sucesso.');
        }),
        catchError(() => {
          setStatusRequestState(this._updatePasswordState, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }

  resetUpdatePasswordState(): void {
    setStatusRequestState(this._updatePasswordState, 'idle');
  }
}
