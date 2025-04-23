import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';

@Injectable({ providedIn: 'root' })
export class MasterService {
  constructor(private http: HttpClient) {}

  getPetList(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${Config.apiUrl}/master/pet-list`).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getPetTypes(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${Config.apiUrl}/master/pet-types`).pipe(
      map((response) => response),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  getPetBreeds(): Observable<ApiResponse> {
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/master/pet-breeds`)
      .pipe(
        map((response) => response),
        catchError((error) => {
          return throwError(() => error);
        }),
      );
  }
}
