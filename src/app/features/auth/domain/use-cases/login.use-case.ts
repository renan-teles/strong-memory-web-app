import { Observable, tap } from 'rxjs';
import { AuthStorageService } from '../../../../core/services/auth-storage/auth-storage.service';
import { ApiResponse } from '../../../../shared/types/api/api-response.interface';
import { inject, Injectable } from '@angular/core';
import { AuthResponse } from '../../data/dto/response/auth-response';

@Injectable({
  providedIn: 'root',
})
export class LoginUseCase {
  private readonly authStorage = inject(AuthStorageService);

  execute(request$: Observable<ApiResponse<AuthResponse>>): Observable<ApiResponse<AuthResponse>> {
    return request$.pipe(
      tap((response: ApiResponse<AuthResponse>) => {
        this.authStorage.saveAuthData(response);
      }),
    );
  }
}
