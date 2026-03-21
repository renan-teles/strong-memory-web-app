import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class AbstractApiService {
  protected readonly BASE_URL!: string;
  protected readonly http: HttpClient = inject(HttpClient);

  constructor(url: string = 'http://localhost:8080/api') {
    this.BASE_URL = url;
  }
}
