import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminGuardGuard implements CanActivate {
  sessionItem: any;
  role: any;
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (sessionStorage.getItem('authToken') == null) {
      this.role = '';
    } else {
      this.sessionItem = sessionStorage.getItem('authToken');
      let authToken: { role: '' } = jwtDecode(this.sessionItem);
      this.role = authToken.role;
    }

    const protectedRoutes: string[] = ['/dashboard/users','/dashboard/messages','/dashboard/clients'];
    return protectedRoutes.includes(state.url) && this.role !== 'admin'
      ? this.router.navigate(['/unauthorized'])
      : true;
  }
}
