import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  logoutSuccess,
} from './authentication.actions';
import { AuthenticationService } from '@/app/services/auth.service';

@Injectable()
export class AuthenticationEffects {
  private actions$ = inject(Actions);

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ username, password }) => {
        return this.authService.login(username, password).pipe(
          map((res) => {
            if (res.token && res.refreshToken && res.profile) {
              const returnUrl =
                this.route.snapshot.queryParams['returnUrl'] || '/';
              this.router.navigateByUrl(returnUrl);
            }
            if (!res.profile) {
              throw new Error('Profile is undefined');
            }
            return loginSuccess({ user: res?.profile });
          }),
          catchError((error) => {
            return of(loginFailure({ error }));
          }),
        );
      }),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      exhaustMap(() => {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
        return of(logoutSuccess());
      }),
    ),
  );
}
