import { AsyncPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { User } from '../../../../core/model/user';
import { Store } from '@ngrx/store';
import { selectAuthLoading, selectUser } from '../../../../core/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { PasswordForm } from '../../components/password-form/password-form';
import { Spinner } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-profile',
  imports: [AsyncPipe , ReactiveFormsModule , ProfileForm , PasswordForm, Spinner],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
   
  isEditMode = signal(false);
  private store = inject(Store);
  private fb = inject(FormBuilder);

  user$ : Observable<User | null>;
  loading$ : Observable<boolean>; 
  passwordForm : FormGroup;

  constructor() {
      this.user$ = this.store.select(selectUser);
      this.loading$ = this.store.select(selectAuthLoading);

      this.passwordForm = this.fb.group({
        currentPassword : ['', Validators.required],
        newPassword : ['', Validators.required],
        confirmPassword : ['', Validators.required]
      });
  }

  toggleEditMode(){
    this.isEditMode.update(value => !value);
  }

  onPasswordSubmit(){

  }
}