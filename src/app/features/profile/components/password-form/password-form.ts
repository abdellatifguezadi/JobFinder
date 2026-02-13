import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading, selectUser } from '../../../../core/store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { User } from '../../../../core/model/user';
import { changePassword } from '../../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-password-form',
  imports: [ReactiveFormsModule , AsyncPipe],
  templateUrl: './password-form.html',
  styleUrl: './password-form.css',
})
export class PasswordForm {


  private store = inject(Store);
  private fb = inject(FormBuilder);

  passwordForm : FormGroup;
  loading$ : Observable<boolean>;
  user$ : Observable<User | null>;
  error$ : Observable<string | null>;
  private currentUser: User | null = null;

  private passwordsMatchValidator = (group: FormGroup) => {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  };

  constructor() {

    this.loading$ = this.store.select(selectAuthLoading);
    this.user$ = this.store.select(selectUser);
    this.error$ = this.store.select(selectAuthError);

    this.passwordForm = this.fb.group({
      currentPassword : ['', [Validators.required]],
      newPassword : ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator });

    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }


  onPasswordSubmit(){
    if (this.passwordForm.valid && this.currentUser) {
      const { currentPassword, newPassword } = this.passwordForm.value;
      this.store.dispatch(changePassword({ userId: this.currentUser.id, oldPassword: currentPassword, newPassword: newPassword }));
      this.passwordForm.reset();
    }
  }

}
