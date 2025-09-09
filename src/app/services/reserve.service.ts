import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';

@Injectable({ providedIn: 'root' })
export class ReserveService {
  constructor(private http: HttpClient) {}

  getReserveGrooming(start: string, end: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/reserve/grooming`, {
        params: { start, end },
      })
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  reserveGrooming(data: any): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${Config.apiUrl}/reserve/grooming`, data)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  updateReserveGrooming(data: any): Observable<ApiResponse> {
    return this.http
      .put<ApiResponse>(`${Config.apiUrl}/reserve/grooming`, data)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  deleteReserveGrooming(id: string): Observable<ApiResponse> {
    return this.http
      .delete<ApiResponse>(`${Config.apiUrl}/reserve/grooming/${id}`)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
