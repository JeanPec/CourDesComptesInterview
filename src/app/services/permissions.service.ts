import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class PermissionsService {
  constructor(private cookieService: CookieService, public router: Router) {}

  canActivate(): boolean {
    if (this.cookieService.check('userInfo')) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
      }
    }
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(PermissionsService).canActivate();
};
