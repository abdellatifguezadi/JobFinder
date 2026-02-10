import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormInputComponent } from "../../../../shared/components/form-input/form-input";
import { FormButtonComponent } from "../../../../shared/components/form-button/form-button";
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import * as authSelectors from '../../store/auth.selectors';
import * as authActions from '../../store/auth.actions';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-register-page',
  imports: [ReactiveFormsModule, FormInputComponent, FormButtonComponent , CommonModule , RouterLink],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {

  private fb = inject(FormBuilder);
  private store = inject(Store);

  registerForm : FormGroup;
  isLoading$ : Observable<boolean>;
  errorMessage$ : Observable<string | null>;



  constructor(){
    this.registerForm = this.fb.group({
      email : ['', [Validators.required , Validators.email]],
      password : ['',[Validators.required , Validators.minLength(6)]],
      lastName : ['', [Validators.required , Validators.minLength(3)]],
      firstName : ['', [Validators.required , Validators.minLength(3)]]
    });

    this.isLoading$ = this.store.select(authSelectors.selectAuthLoading);
    this.errorMessage$ = this.store.select(authSelectors.selectAuthError);

  }

  onSubmit(){
      if(this.registerForm.valid){
        this.store.dispatch(authActions.register({
          request : this.registerForm.value
        }));
      }
  }
}
