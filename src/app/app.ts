import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/components/header/header";
import { Store } from '@ngrx/store';
import * as authSelectors from './core/store/auth/auth.selectors';
import * as favoritesActions from './core/store/favorites/favorites.actions';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('JobFinder1');
  private store = inject(Store);

  ngOnInit(): void {
    this.store.select(authSelectors.selectUser).pipe(take(1)).subscribe(user => {
      if (user) {
        this.store.dispatch(favoritesActions.loadFavorites({ userId: user.id }));
      }
    });
  }
}
