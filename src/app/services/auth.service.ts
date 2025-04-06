import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';
import type { Observable } from 'rxjs';
import { LoginResponse, UserProfile } from '@store/authentication/auth.model';
import { Config } from '../app.config';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user: UserProfile | null = null;

  public readonly token = 'token';
  public readonly refreshToken = 'refreshToken';
  public readonly userprofile = 'userprofile';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${Config.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        map((response) => {
          if (
            response &&
            response.token &&
            response.refreshToken &&
            response.profile
          ) {
            this.user = response.profile;
            this.saveSession(response);
          }
          return response;
        }),
      );
  }

  logout(): void {
    this.removeSession();
    this.user = null;
  }

  get session(): string {
    return this.cookieService.get(this.token);
  }

  saveSession(response: any): void {
    this.cookieService.set(this.token, response!.token!);
    this.cookieService.set(this.refreshToken, response!.refreshToken!);
    this.cookieService.set(this.userprofile, response!.profile!);
  }

  removeSession(): void {
    this.cookieService.delete(this.token);
    this.cookieService.delete(this.refreshToken);
    this.cookieService.delete(this.userprofile);
  }
}
