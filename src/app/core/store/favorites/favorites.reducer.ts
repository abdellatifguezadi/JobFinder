import { createReducer, on } from '@ngrx/store';
import * as favoritesActions from './favorites.actions';
import * as authActions from '../auth/auth.actions';
import { initialFavoritesState } from './favorites.state';

export const favoritesReducer = createReducer(
  initialFavoritesState,
  
  on(favoritesActions.loadFavorites, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(favoritesActions.loadFavoritesSuccess, (state, { favorites }) => ({
    ...state,
    favorites: favorites,
    loading: false,
    error: null
  })),

  on(favoritesActions.loadFavoritesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(favoritesActions.addFavorite, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(favoritesActions.addFavoriteSuccess, (state, { favorite }) => ({
    ...state,
    favorites: [...state.favorites, favorite],
    loading: false,
    error: null
  })),

  on(favoritesActions.addFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  on(favoritesActions.removeFavorite, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(favoritesActions.removeFavoriteSuccess, (state, { favoriteId }) => ({
    ...state,
    favorites: state.favorites.filter(fav => fav.id !== favoriteId),
    loading: false,
    error: null
  })),

  on(favoritesActions.removeFavoriteFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),

  // Clear favorites on logout
  on(authActions.logout, () => initialFavoritesState)
);
