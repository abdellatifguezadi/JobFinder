import { Component, inject, input } from '@angular/core';
import { Favorite } from '../../../../core/model/favorite';
import { Store } from '@ngrx/store';
import * as favoritesActions from '../../../../core/store/favorites/favorites.actions';

@Component({
  selector: 'app-favorite-item',
  imports: [],
  templateUrl: './favorite-item.html',
  styleUrl: './favorite-item.css',
})
export class FavoriteItem {
  favorite = input.required<Favorite>();
  store = inject(Store);

  removeFavorite(): void {
    this.store.dispatch(favoritesActions.removeFavorite({ favoriteId: this.favorite().id }));
  }
}
