import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../../services';
import { RouteType, UserType } from '../../enums';
import { RouteConstants } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routeType = route.data['routeType'] as number;
    if (routeType === RouteType.Private) {
      const user = this.sharedService.getUser();
      if (user) {
        const allowedUserTypes = route.data['allowedUserTypes'] as number[];
        if (allowedUserTypes.includes(user.role)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      const user = this.sharedService.getUser();
      if (
        user &&
        (state.url === `/${RouteConstants.Login}` ||
          state.url === `/${RouteConstants.AdminLogin}`)
      ) {
        if (user.role == UserType.Admin) {
          this.router.navigate([RouteConstants.SignUp]);
        } else {
          this.router.navigate([
            `${RouteConstants.SmartX}/${RouteConstants.DashBoard}`,
          ]);
        }
        return false;
      }
      return true;
    }
  }
}
