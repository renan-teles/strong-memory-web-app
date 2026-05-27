import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UpdatePasswordRequest } from '../../../dto/request/update-password-request';
import { AbstractApiService } from '../../../../../../core/services/api/abstract-api.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerApiService extends AbstractApiService {
  constructor() {
    super();
  }

  updatePassword(data: UpdatePasswordRequest): Observable<void> {
    return this.http.patch<void>(`${this.BASE_URL}/player/password`, data);
  }
}
