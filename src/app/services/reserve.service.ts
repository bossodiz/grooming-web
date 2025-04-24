import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';

@Injectable({ providedIn: 'root' })
export class ReserveService {
  constructor(private http: HttpClient) {}

  getReserveGrooming(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${Config.apiUrl}/reserve/grooming`).pipe(
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
}
