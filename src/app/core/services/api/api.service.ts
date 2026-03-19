import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService {
  protected readonly BASE_URL: string = 'http://localhost:8080/api';
  protected readonly http: HttpClient = inject(HttpClient);
}
