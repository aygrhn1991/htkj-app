import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/models/result.model';
import { VehModel } from 'src/app/models/veh.model';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  constructor(private http: HttpClient,
    private util:UtilService) { }

  veh: VehModel = new VehModel();
  date:Date=new Date();
  week:string=null;
  ngOnInit() {
    let veh = JSON.parse(localStorage.getItem('access_veh'));
    this.http.get(`/htkjapp/htkjapp/statCtrl/getHomeData/${veh.vid}`).subscribe((data: Result) => {
      this.data = data.data;
    });
    this.veh = JSON.parse(localStorage.getItem('access_veh'));
    this.week=this.util.dateToWeekday(new Date());
  }

  data: any = {};
  key: string = null;

}
