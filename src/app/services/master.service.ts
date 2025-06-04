import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Config } from '../app.config';
import { throwError, type Observable } from 'rxjs';
import { ApiResponse } from './model';
import { param } from 'lightgallery/plugins/video/lg-video-utils';

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

  getGroomingServices(petTypeId?: number): Observable<ApiResponse> {
    const options =
      petTypeId !== undefined ? { params: { type: petTypeId } } : {};

    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/master/grooming-list`, options)
      .pipe(
        map((response) => response),
        catchError((error) => throwError(() => error)),
      );
  }

  getPetTypeByName(name: string): Observable<ApiResponse> {
    const params = new HttpParams().set('name', name);
    return this.http
      .get<ApiResponse>(`${Config.apiUrl}/master/pet-type`, { params })
      .pipe(
        map((response) => response),
        catchError((error) => throwError(() => error)),
      );
  }
}
