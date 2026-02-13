import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { usaJobsApiInterceptor } from './core/interceptors/UsaJobs-api.interceptor';
import { authReducer } from './core/store/auth/auth.reducer';
import { AuthEffects } from './core/store/auth/auth.effects';
import { favoritesReducer } from './core/store/favorites/favorites.reducer';
import { FavoritesEffects } from './core/store/favorites/favorites.effects';



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([usaJobsApiInterceptor])),
    provideStore({auth : authReducer, favorites: favoritesReducer}),
    provideEffects([AuthEffects, FavoritesEffects])
]
};
