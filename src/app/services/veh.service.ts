import { Injectable } from '@angular/core';
import { VehModel } from '../models/veh.model';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class VehService {

  constructor(private util: UtilService,
    private http: HttpClient) {
    if (!this.util.isNull(localStorage.getItem('access_token'))) {
      this.getVeh().subscribe((data: Result) => {
        this.makeVeh(data.data);
      });
    }
  }

  getVeh(): Observable<Object> {
    return this.http.get(`/htkjapp/htkjapp/getUserVehs`);
  }

  makeVeh(data: Array<any>): void {
    let vehList = data.map(x => {
      let veh = new VehModel();
      veh.vid = x.vid;
      veh.vin = x.vin;
      veh.vno = x.vno;
      return veh;
    });
    localStorage.setItem('access_vehs', JSON.stringify(vehList));
    if (vehList.length != 0) {
      localStorage.setItem('access_veh', JSON.stringify(vehList[0]));
    }
  }

}
