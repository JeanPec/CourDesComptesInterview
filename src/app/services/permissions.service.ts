import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class PermissionsService {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(): boolean {
    if (this.authService.getAuthorizationToken() !== undefined) {
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
