import { Routes } from '@angular/router';
import { AuthGuard } from './core/authentication/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./core/layout/home/home').then((m) => m.Home),
  },
  {
    path: 'discover',
    loadComponent: () =>
      import('./features/components/discover/discover').then((m) => m.Discover),
    //canActivate: [AuthGuard],
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./features/components/movie/movie').then((m) => m.MovieComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'person/:id',
    loadComponent: () =>
      import('./features/components/person/person').then(
        (m) => m.PersonComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./core/authentication/sign-in/sign-in').then((m) => m.SignIn),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./core/authentication/sign-up/sign-up').then((m) => m.SignUp),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
