import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../../core/services/auth/auth.service';
import * as authAction from '../store/auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';

@Injectable()
export class AuthEffects {
  private action$ = inject(Actions);
  private authservice = inject(AuthService);

  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.login),
      exhaustMap((action) =>
        this.authservice.login(action.credentials).pipe(
          map((response) =>
            authAction.loginSucces({
              user: response,
            }),
          ),
          catchError((error) => {
            return of(
              authAction.loginFailure({
                error: 'Invalid email or password',
              }),
            );
          }),
        ),
      ),
    );
  });



  saveUser$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(authAction.loginSucces, authAction.registerSucces),
        tap((action) => {
          const { password, ...safeUser } = action.user;
          localStorage.setItem('user', JSON.stringify(safeUser));
        }),
      ),
    { dispatch: false },
  );
}
