import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { map, skip, take } from 'rxjs/operators'; 
import { AuthenticationService } from '../services/authentication';

export const AuthGuard: CanActivateFn = () => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  return toObservable(authService.currentUser).pipe(
    skip(1),
    take(1),
    map((user) => {
      if (user) {
        return true;
      } else {
        router.navigate(['/sign-in']);
        return false;
      }
    }),
  );
};
