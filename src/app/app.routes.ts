import { Routes } from '@angular/router';
import { LoginPage } from './features/auth/pages/login-page/login-page';
import { RegisterPage } from './features/auth/pages/register-page/register-page';
import { OffersList } from './features/offres/pages/offers-list/offers-list';

export const routes: Routes = [
  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'offers', component: OffersList },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
