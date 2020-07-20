import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UtilService } from './util.service';
import { VehModel } from '../models/veh.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  currentUser: UserModel = new UserModel();
  currentVeh: VehModel = new VehModel();

  constructor(private util: UtilService) {
    let userObj = localStorage.getItem('user');
    if (!this.util.isNull(userObj)) {
      this.currentUser = JSON.parse(userObj);
    } else {
      this.currentUser = null;
    }
    let vehObj = localStorage.getItem('veh');
    if (!this.util.isNull(vehObj)) {
      this.currentVeh = JSON.parse(vehObj);
    } else {
      this.currentVeh = null;
    }
  }

}
