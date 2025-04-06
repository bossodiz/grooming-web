import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(private http: HttpClient) {}

  register(request: any): Observable<ApiResponse> {
    return this.http
      .post<
      ApiResponse
      >(`${Config.apiUrl}/member/register`, request)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getCustomers(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/member/customers`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
  getCustomerId(id: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/member/customers/` + id)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  updateProfile(request: any): Observable<ApiResponse> {
    return this.http
      .patch<
      ApiResponse
      >(`${Config.apiUrl}/member/customers/` + request.id, request)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
  
  updateProfileRemark(request: any): Observable<ApiResponse> {
    return this.http
      .patch<
      ApiResponse
      >(`${Config.apiUrl}/member/customers/remark/` + request.id, request)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getCustomerRemark(id: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(
        `${Config.apiUrl}/member/customers/remark/` + id,
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getCustomerPet(id: number): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/member/customers/` + id + '/pets')
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
