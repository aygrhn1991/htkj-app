import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from './util.service';
import { SecurityService } from './security.service';
import { VehService } from './veh.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private router: Router,
    private util: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.util.isNull(localStorage.getItem('access_user'))) {
      this.router.navigate(['/security/login']);
      return false;
    }
    let vehs = JSON.parse(localStorage.getItem('access_vehs'));
    let veh = JSON.parse(localStorage.getItem('access_veh'));
    if (vehs.length == 0 || this.util.isNull(veh)) {
      this.router.navigate(['/security/bind']);
      return false;
    }
    return true;
  }

}
