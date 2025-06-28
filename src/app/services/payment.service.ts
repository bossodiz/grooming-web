import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from './model';
import { Config } from '../app.config';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  constructor(private http: HttpClient) {}
  getCustomers(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/payment/customers`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getPetListByCustomerId(customerId: string): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/payment/pets/${customerId}`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getGroomingServiceList(typeId: any): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(
        `${Config.apiUrl}/payment/grooming-services?petTypeId=${typeId}`,
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getPetShopServiceList(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/payment/pet-shop-services`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  calculatePayment(data: any): Observable<ApiResponse> {
    return this.http
      .post<ApiResponse>(`${Config.apiUrl}/payment/calculate`, data)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
