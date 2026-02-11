import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as authAction from './auth.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private action$ = inject(Actions);
  private authservice = inject(AuthService);
  private router = inject(Router);


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
          catchError(() => {
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

  register$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.register),
      exhaustMap((action) =>
        this.authservice.register(action.request).pipe(
          map((response) =>
            authAction.registerSucces({
              user: response,
            }),
          ),
          catchError((error) => {
            return of(
              authAction.registerFailure({
                error: error.message || 'Registration failed',
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
        ofType(authAction.loginSucces, authAction.registerSucces, authAction.updateUserSuccess),
        tap((action) => {
          const { password, ...safeUser } = action.user;
          localStorage.setItem('user', JSON.stringify(safeUser));
          this.router.navigate(['/profile']);
        }),
      ),
    { dispatch: false },
  );



    logout$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(authAction.logout),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );


  updateUser$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.updateUser),
      exhaustMap((action) =>
        this.authservice.updateUser(action.user).pipe(
          map((response) =>
            authAction.updateUserSuccess({
              user: response,
            }),
          ),
          catchError(() => {
            return of(
              authAction.updateUserFailure({
                error: 'Update user Failure',
              }),
            );
          }),
        ),
      ),
    );
  });

  changePassword$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.changePassword),
      exhaustMap((action) =>
        this.authservice.changePassword(action.userId, action.oldPassword, action.newPassword).pipe(
          map(() =>
            authAction.changePasswordSuccess(),
          ),
          catchError((error) => {
            return of(
              authAction.changePasswordFailure({
                error: error.message || 'Change password failed',
              }),
            );
          }),
        ),
      ),
    );
  });
}
