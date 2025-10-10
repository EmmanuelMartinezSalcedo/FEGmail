import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
    //canActivate: [authGuard],
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/landing/landing').then((m) => m.Landing),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then(
        (m) => m.PrivacyPolicy
      ),
  },
  {
    path: 'terms-conditions',
    loadComponent: () =>
      import('./pages/terms-conditions/terms-conditions').then(
        (m) => m.TermsConditions
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
