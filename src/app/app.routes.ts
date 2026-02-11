import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { OffersList } from './features/offres/pages/offers-list/offers-list';
import { loginGuard } from './core/guard/login.guard';
import { AuthGuard } from './core/guard/auth.guard';
import { Profile } from './features/profile/pages/profile/profile';

export const routes: Routes = [
  { path: 'login', component: LoginPage , canActivate: [loginGuard] },
  { path: 'register', component: RegisterPage, canActivate : [loginGuard] },
  { path: 'profile', component: Profile , canActivate : [AuthGuard]},
  { path: 'offers', component: OffersList},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
