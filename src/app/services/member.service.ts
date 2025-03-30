import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MemberService {
  constructor(private http: HttpClient) {}

  register(request: any): Observable<RegisterResponse> {
    return this.http
      .post<RegisterResponse>(`${Config.apiUrl}/member/register`, request)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }

  getCustomers(): Observable<CustomerResponse> {
    return this.http.get<any>(`${Config.apiUrl}/member/customers`).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}

export class RegisterResponse {
  code?: string;
  message?: string;
  data?: any;
}

export class CustomerResponse {
  code?: string;
  message?: string;
  data?: CustomerTableList[];
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
