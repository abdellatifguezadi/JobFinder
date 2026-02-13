import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FavoritesState } from "./favorites.state";

export const selectFavoritesState = createFeatureSelector<FavoritesState>('favorites');

export const selectAllFavorites = createSelector(
  selectFavoritesState,
  (state) => state.favorites
);

export const selectFavoritesLoading = createSelector(
  selectFavoritesState,
  (state) => state.loading
);

export const selectFavoritesError = createSelector(
  selectFavoritesState,
  (state) => state.error
);

export const selectIsFavorite = (jobId: string) => createSelector(
  selectAllFavorites,
  (favorites) => favorites.some(fav => fav.offerId === jobId)
);

export const selectFavoriteByJobId = (jobId: string) => createSelector(
  selectAllFavorites,
  (favorites) => favorites.find(fav => fav.offerId === jobId)
);
