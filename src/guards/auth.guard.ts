import {inject} from '@angular/core';
import {Router, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {AuthService} from "../app/core/services/auth.service";

export function authGuard(): Observable<boolean | UrlTree> {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    take(1),
    map(isLoggedIn => {
      if (!isLoggedIn) {
        return router.createUrlTree(['/login'], {queryParams: {authRequired: 'true'}});
      }
      return true;
    })
  );
}
