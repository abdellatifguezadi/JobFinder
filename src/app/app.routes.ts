import { Routes } from '@angular/router';
import { loginGuard } from './core/guard/login.guard';
import { AuthGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login-page/login-page').then(m => m.LoginPage), canActivate: [loginGuard] },
  { path: 'register', loadComponent: () => import('./features/auth/pages/register-page/register-page').then(m => m.RegisterPage), canActivate: [loginGuard] },
  { path: 'profile', loadComponent: () => import('./features/profile/pages/profile/profile').then(m => m.Profile), canActivate: [AuthGuard]},
  { path: 'favorites', loadComponent: () => import('./features/favorites/pages/favorites-page/favorites-page').then(m => m.FavoritesPage), canActivate: [AuthGuard]},
  { path: 'track', loadComponent: () => import('./features/tracked/pages/tracked-page/tracked-page').then(m => m.TrackedPage), canActivate: [AuthGuard]},
  { path: 'offers', loadComponent: () => import('./features/offres/pages/offers-list/offers-list').then(m => m.OffersList)},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
