import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { PetDetaile } from './pet.service';

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(private http: HttpClient) {}

  register(request: any): Observable<Response<CustomerDetail>> {
    return this.http
      .post<
        Response<CustomerDetail>
      >(`${Config.apiUrl}/member/register`, request)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getCustomers(): Observable<Response<CustomerTableList>> {
    return this.http
      .get<Response<CustomerTableList>>(`${Config.apiUrl}/member/customers`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
  getCustomerId(id: number): Observable<Response<CustomerDetail>> {
    return this.http
      .get<Response<CustomerDetail>>(`${Config.apiUrl}/member/customers/` + id)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  updateProfile(request: any): Observable<Response<CustomerDetail>> {
    return this.http
      .patch<
        Response<CustomerDetail>
      >(`${Config.apiUrl}/member/customers/` + request.id, request)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}

export class Response<T> {
  code?: number;
  message?: string;
  data?: any;
}

export class CustomerTableList {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneOther?: string;
  serviceCount?: number;
  createdDate?: string;
  lastedDate?: string;
}

export class CustomerDetail {
  id?: number;
  name?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  phoneOther?: string;
  serviceCount?: number;
  createdDate?: string;
  lastedDate?: string;
  pets?: PetDetaile[];
}
