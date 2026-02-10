import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../dto/login-request';
import { catchError, map, Observable, throwError } from 'rxjs';
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
    return this.http.post<AuthResponse>(`${this.apiUrl}/users`, request);
  }
}
