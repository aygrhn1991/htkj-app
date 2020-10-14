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

  ionViewWillEnter() {
    this.ngOnInit();
  }

  constructor(private http: HttpClient,
    private util: UtilService) { }

  veh: VehModel = new VehModel();
  time: string = null;
  date: Date = new Date();
  week: string = null;
  ngOnInit() {
    this.veh = JSON.parse(localStorage.getItem('access_veh'));
    this.time = new Date().getHours() < 12 ? '上午好' : '下午好';
    this.week = this.util.dateToWeekday(new Date());
    this.http.get(`/htkjapp/htkjapp/statCtrl/getHomeData/${this.veh.vid}`).subscribe((data: Result) => {
      this.data = data.data;
    });
  }

  data: any = {};
  key: string = null;



}
