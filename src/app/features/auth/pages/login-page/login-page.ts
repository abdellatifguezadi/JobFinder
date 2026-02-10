import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import * as authActions from '../../../../core/store/auth/auth.actions';
import * as authSelectors from '../../../../core/store/auth/auth.selectors';
import { FormInputComponent } from '../../../../shared/components/form-input/form-input';
import { FormButtonComponent } from '../../../../shared/components/form-button/form-button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ CommonModule, ReactiveFormsModule, RouterLink, FormInputComponent, FormButtonComponent ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  loginForm: FormGroup;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.isLoading$ = this.store.select(authSelectors.selectAuthLoading);
    this.errorMessage$ = this.store.select(authSelectors.selectAuthError);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(authActions.login({
        credentials: this.loginForm.value
      }));
    }
  }
}


