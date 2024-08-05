import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const protectedRoutes: string[] = [
      '/dashboard/users',
      '/dashboard/messages',
      '/dashboard/clients',
      '/send-email',
    ];
    return protectedRoutes.includes(state.url) &&
      !sessionStorage.getItem('authToken')
      ? this.router.navigate(['/'])
      : true;
  }
}
