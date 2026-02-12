import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FavoritesService } from '../../services/favorites/favorites.service';
import * as favoritesActions from './favorites.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class FavoritesEffects {
  private actions$ = inject(Actions);
  private favoritesService = inject(FavoritesService);

  loadFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(favoritesActions.loadFavorites),
      exhaustMap((action) =>
        this.favoritesService.getFavoritesByUserId(action.userId).pipe(
          map((favorites) =>
            favoritesActions.loadFavoritesSuccess({ favorites })
          ),
          catchError((error) =>
            of(
              favoritesActions.loadFavoritesFailure({
                error: error.message || 'Failed to load favorites',
              })
            )
          )
        )
      )
    );
  });

  addFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(favoritesActions.addFavorite),
      exhaustMap((action) =>
        this.favoritesService.addFavorite(action.userId, action.jobId, action.title, action.company, action.location).pipe(
          map((favorite) =>
            favoritesActions.addFavoriteSuccess({ favorite })
          ),
          catchError((error) =>
            of(
              favoritesActions.addFavoriteFailure({
                error: error.message || 'Failed to add favorite',
              })
            )
          )
        )
      )
    );
  });

  removeFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(favoritesActions.removeFavorite),
      exhaustMap((action) =>
        this.favoritesService.removeFavorite(action.favoriteId).pipe(
          map(() =>
            favoritesActions.removeFavoriteSuccess({
              favoriteId: action.favoriteId,
            })
          ),
          catchError((error) =>
            of(
              favoritesActions.removeFavoriteFailure({
                error: error.message || 'Failed to remove favorite',
              })
            )
          )
        )
      )
    );
  });
}
