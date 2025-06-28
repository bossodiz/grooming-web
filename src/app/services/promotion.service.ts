import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from './model';
import { Config } from '../app.config';

@Injectable({ providedIn: 'root' })
export class PromotionService {
  constructor(private http: HttpClient) {}
  getPromotion(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${Config.apiUrl}/promotion/list`).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
