import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { tap, catchError, EMPTY, Observable } from 'rxjs';
import { ApiResponse } from '../../../../../shared/types/api/api-response.interface';
import {
  setRequestState,
  setStatusRequestState,
} from '../../../../../shared/utils/request-state.utils';
import { RegisterUserRequest } from '../../../../users/data/dto/request/register-user-request';
import { CreatedUserResponse } from '../../../../users/data/dto/response/created-user-response';
import { Router } from '@angular/router';
import { AlertService } from '../../../../../shared/services/alert/alert.service';
import { RequestState } from '../../../../../shared/types/api/request-state.interface';
import { AuthApiService } from '../../../data/services/auth-api/auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterFacade {
  private readonly api: AuthApiService = inject(AuthApiService);
  protected readonly alert: AlertService = inject(AlertService);
  protected readonly router: Router = inject(Router);

  protected readonly _state = signal<RequestState<CreatedUserResponse | null>>({
    status: 'idle',
    data: null,
  });

  readonly isRegistering: Signal<boolean> = computed(() => this._state().status === 'loading');
  readonly registerSuccess: Signal<boolean> = computed(() => this._state().status === 'success');

  registerAdministrator(data: RegisterUserRequest): void {
    this.handleRegister(this.api.registerAdministrator(data), '/auth/administrator');
  }

  registerPlayer(data: RegisterUserRequest): void {
    this.handleRegister(this.api.registerPlayer(data), '/auth/player');
  }

  private handleRegister(
    request$: Observable<ApiResponse<CreatedUserResponse>>,
    redirectTo: string,
  ): void {
    setRequestState(this._state, 'loading', null);

    request$
      .pipe(
        tap((response: ApiResponse<CreatedUserResponse>) => {
          setRequestState(this._state, 'success', response.data!);
          this.alert.success(response.message);
          this.router.navigate([redirectTo]);
        }),
        catchError(() => {
          setStatusRequestState(this._state, 'error');
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
