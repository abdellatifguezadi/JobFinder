import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAuthError, selectAuthLoading, selectUser } from '../../../../core/store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { User } from '../../../../core/model/user';
import { deleteUser } from '../../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-delete-form',
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.css',
})
export class DeleteForm {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  deleteForm: FormGroup;
  loading$: Observable<boolean>;
  user$: Observable<User | null>;
  error$: Observable<string | null>;
  private currentUser: User | null = null;
  showConfirmation = false;

  constructor() {
    this.loading$ = this.store.select(selectAuthLoading);
    this.user$ = this.store.select(selectUser);
    this.error$ = this.store.select(selectAuthError);

    this.deleteForm = this.fb.group({
      password: ['', [Validators.required]]
    });

    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  onDeleteSubmit() {
    if (this.deleteForm.valid && this.currentUser) {
      const { password } = this.deleteForm.value;
      
      if (password === this.currentUser.password) {
        this.showConfirmation = true;
      } else {
        this.deleteForm.get('password')?.setErrors({ incorrect: true });
      }
    }
  }

  confirmDelete() {
    if (this.currentUser) {
      this.store.dispatch(deleteUser({ userId: this.currentUser.id }));
    }
  }

  cancelDelete() {
    this.showConfirmation = false;
    this.deleteForm.reset();
  }


  getError(controlName : string){
      const control = this.deleteForm.get(controlName);

      if(!control || !control.touched || control.valid){
        return ""
      }

      if(control.errors?.['required']){
        return "Password is required"
      }

      if(control.errors?.['incorrect']){
        return "Incorrect password"
      }

      return 'Champ invalide';
  }
}
