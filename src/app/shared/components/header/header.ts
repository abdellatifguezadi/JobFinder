import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { selectAuthenticated, selectUser } from '../../../core/store/auth/auth.selectors';
import { logout } from '../../../core/store/auth/auth.actions';
import { User } from '../../../core/model/user';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  isAuthenticated$: Observable<boolean>;
  user$: Observable<User | null>;

  constructor(private store: Store) {
    this.isAuthenticated$ = this.store.select(selectAuthenticated);
    this.user$ = this.store.select(selectUser);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
