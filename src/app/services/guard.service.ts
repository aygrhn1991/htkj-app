import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from './util.service';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
    private util: UtilService,
    private securityService: SecurityService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.util.isNull(this.securityService.currentUser)) {
      this.router.navigate(['/security/login']);
      return false;
    }
    console.log(this.securityService.currentVeh)
    if (this.util.isNull(this.securityService.currentVeh)) {
      this.router.navigate(['/security/bind']);
      return false;
    }
    return true;
  }

}
