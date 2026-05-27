import { Observable, tap } from 'rxjs';
import { ApiResponse } from '../../../../shared/types/api/api-response.interface';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../../data/dto/response/auth-response';
import { AuthStateService } from '../../../../core/services/auth/auth-state.service';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private readonly authState: AuthStateService = inject(AuthStateService);

  execute(request$: Observable<ApiResponse<AuthResponse>>): Observable<ApiResponse<AuthResponse>> {
    return request$.pipe(
      tap((response: ApiResponse<AuthResponse>) => {
        this.authState.setAccessToken(response.data!.accessToken);
        this.authState.setUserRole(response.data!.role);
      }),
    );
  }
}
