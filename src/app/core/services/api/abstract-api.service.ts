import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../../../environments/environment';

export abstract class AbstractApiService {
  protected readonly BASE_URL: string = environment.apiUrl;
  protected readonly http: HttpClient = inject(HttpClient);
}
