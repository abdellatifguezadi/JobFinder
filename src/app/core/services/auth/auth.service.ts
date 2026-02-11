import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../dto/login-request';
import { catchError, map, Observable, throwError, switchMap } from 'rxjs';
import { AuthResponse } from '../../dto/auth-response';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../../dto/register-request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http
      .get<
        AuthResponse[]
      >(`${this.apiUrl}/users?email=${request.email}&password=${request.password}`)
      .pipe(
        map((users) => {
          if (users.length > 0) {
            return users[0];
          } else {
            throw new Error('Invalid credentials');
          }
        }),
        catchError((error) => {
          return throwError(() => new Error('Invalid credentials'));
        }),
      );
  }

  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.checkEmailExists(request.email).pipe(
      switchMap((emailExists) => {
        if (emailExists) {
          return throwError(() => new Error('This email is already registered. Please use another email or login.'));
        }
        return this.http.post<AuthResponse>(`${this.apiUrl}/users`, request);
      })
    );
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this.http.get<AuthResponse[]>(`${this.apiUrl}/users?email=${email}`).pipe(
      map((users) => users.length > 0)
    );
  }

  updateUser(user: AuthResponse): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.apiUrl}/users/${user.id}`, user);
  }

}
