import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';

@Injectable({ providedIn: 'root' })
export class GroomingService {
  constructor(private http: HttpClient) {}

  getService(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/grooming-service/list`, {})
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  addService(data: any): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${Config.apiUrl}/grooming-service/save`, data)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getServiceById(id: number): Observable<ApiResponse> {
    const httpParams = new HttpParams().set('id', id);
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/grooming-service`, {
        params: httpParams,
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  deleteService(id: number): Observable<ApiResponse> {
    const httpParams = new HttpParams().set('id', id);
    return this.http
      .delete<ApiResponse>(`${Config.apiUrl}/grooming-service/delete`, {
        params: httpParams,
      })
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
