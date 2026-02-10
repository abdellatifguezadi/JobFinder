import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authState } from "./auth.state";


export const selectAuthState  = createFeatureSelector<authState>('auth');


export const selectAuthLoading = createSelector(selectAuthState, state => state.loading);

export const selectAuthError = createSelector(selectAuthState , state => state.error);

export const selectUser = createSelector(selectAuthState , state => state.user);

export const selectAuthenticated = createSelector(selectAuthState , state => state.isAuthenticated);


