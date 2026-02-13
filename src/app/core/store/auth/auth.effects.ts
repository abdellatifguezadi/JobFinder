import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as authAction from './auth.actions';
import * as favoritesActions from '../favorites/favorites.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast/toast.service';

@Injectable()
export class AuthEffects {
  private action$ = inject(Actions);
  private authservice = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);


  login$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.login),
      exhaustMap((action) =>
        this.authservice.login(action.credentials).pipe(
          map((response) => {
            this.toastService.success(`Welcome back, ${response.firstName}!`);
            console.log(response)
            return authAction.loginSucces({
              user: response,
            });
          }),
          catchError(() => {
            this.toastService.error('Login failed. Please check your credentials.');
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
          map((response) => {
            this.toastService.success(`Account created! Welcome, ${response.firstName}!`);
            return authAction.registerSucces({
              user: response,
            });
          }),
          catchError((error) => {
            this.toastService.error('Registration failed. Email might already exist.');
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
          // console.log(action);
          
          localStorage.setItem('user', JSON.stringify(safeUser));
          this.router.navigate(['/profile']);
        }),
      ),
    { dispatch: false },
  );

  loadFavoritesOnAuth$ = createEffect(() => {
    return this.action$.pipe(
      ofType(authAction.loginSucces, authAction.registerSucces),
      map((action) => favoritesActions.loadFavorites({ userId: action.user.id }))
    );
  });



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
        this.authservice.updateUser(action.user , action.user.id).pipe(
          map((response) =>{
            this.toastService.success("User updated successfully!");
            return authAction.updateUserSuccess({
              user: response,
            })
          }
            

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


  deletUser$ = createEffect(()=>{
      return this.action$.pipe(
        ofType(authAction.deleteUser),
        exhaustMap((action)=>
        this.authservice.deleteUser(action.userId).pipe(
          map(()=>{
            this.toastService.success("Account deleted successfully!");
            return authAction.deletUserSucces()
          }),
          catchError((err)=>{
            this.toastService.error('Failed to delete account. Please try again.');
            return of(authAction.deleteUserFailure(err))
          })
        )
        )
      )
  })

  deleteUserSuccess$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(authAction.deletUserSucces),
        tap(() => {
          localStorage.removeItem('user');
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
}
