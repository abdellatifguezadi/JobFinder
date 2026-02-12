import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Favorite } from '../../../../core/model/favorite';
import * as favoritesSelectors from '../../../../core/store/favorites/favorites.selectors';
import * as favoritesActions from '../../../../core/store/favorites/favorites.actions';
import * as authSelectors from '../../../../core/store/auth/auth.selectors';
import { AsyncPipe } from '@angular/common';
import { FavoriteItem } from '../../components/favorite-item/favorite-item';
import { RouterLink } from '@angular/router';
import { Spinner } from '../../../../shared/components/spinner/spinner';

@Component({
  selector: 'app-favorites-page',
  imports: [AsyncPipe, FavoriteItem, RouterLink, Spinner],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css'
})
export class FavoritesPage implements OnInit {
  private store = inject(Store);

  favorites$: Observable<Favorite[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor() {
    this.favorites$ = this.store.select(favoritesSelectors.selectAllFavorites);
    this.loading$ = this.store.select(favoritesSelectors.selectFavoritesLoading);
    this.error$ = this.store.select(favoritesSelectors.selectFavoritesError);
  }

  ngOnInit(): void {
    this.store.select(authSelectors.selectUser).subscribe(user => {
      if (user) {
        this.store.dispatch(favoritesActions.loadFavorites({ userId: user.id }));
      }
    });
  }
}
