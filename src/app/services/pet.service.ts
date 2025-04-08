import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';

@Injectable({ providedIn: 'root' })
export class PetService {
  constructor(private http: HttpClient) {}

  getPetList(id: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${Config.apiUrl}/pet/${id}`).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }

  addPet(data: any): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${Config.apiUrl}/pet/add`, data).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      }),
    );
  }
}
