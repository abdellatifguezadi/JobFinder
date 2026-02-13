import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../../../core/model/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectAuthLoading, selectUser } from '../../../../core/store/auth/auth.selectors';
import { updateUser } from '../../../../core/store/auth/auth.actions';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-profile-form',
  imports: [ReactiveFormsModule , AsyncPipe],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css',
})
export class ProfileForm {

  @Output() toggleEditMode = new EventEmitter<void>();

  private store = inject(Store);
  private fb = inject(FormBuilder);
  authService = inject(AuthService);

  user$: Observable<User | null>;
  loading$: Observable<boolean>;
  profileForm: FormGroup;
  private currentUser: User | null = null;



  constructor() {


    this.user$ = this.store.select(selectUser);
    console.log(this.user$.pipe(
      tap((user) => console.log(user),
      )
    ).subscribe());
    
        this.loading$ = this.store.select(selectAuthLoading);


        this.profileForm = this.fb.group({
        firstName : ['', [Validators.required , Validators.minLength(3)]],
        lastName : ['', [Validators.required , Validators.minLength(3)]],
        email : ['',[Validators.required , Validators.email]]
      });


      this.user$.subscribe(user => {
        if (user) {
          this.currentUser = user;
          this.profileForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password : user.password
          });
        }
      });
  }



 onProfileSubmit(){
  if(this.profileForm.valid && this.currentUser){    

      const updatedUser: User = {
        ...this.currentUser,
        firstName: this.profileForm.value.firstName,
        lastName: this.profileForm.value.lastName,
        email: this.profileForm.value.email,
      };

      console.log(updatedUser);

      this.store.dispatch(updateUser({
        user: updatedUser
      }));

      this.toggleEditMode.emit();
    }

  }


  getError(controlName : string) : string {

    const control = this.profileForm.get(controlName);

    if(!control || !control.touched || control.valid){
      return '';
    }

    if(control.errors?.['required']){
      return 'Ce champ est obligatoire'
    }

    if(control.errors?.['email']){
      return 'Email non valide'
    }

    if(control.errors?.['minlength']){ 
      return `Minimum ${control.errors['minlength'].requiredLength} caracters`
    }

    return 'Champ invalide';

  }


}
