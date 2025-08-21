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

  getPromotionById(id: string) {
    return this.http.get<ApiResponse>(`${Config.apiUrl}/promotion/${id}`).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getItemList(type: string) {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/promotion/items/${type}`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getItemListIncluded(id: string) {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/promotion/${id}/include`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getItemListExcluded(id: string) {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/promotion/${id}/exclude`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  updatePromotion(id: string, data: any) {
    let body = { ...data };
    return this.http
      .put<ApiResponse>(`${Config.apiUrl}/promotion/${id}`, body)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
