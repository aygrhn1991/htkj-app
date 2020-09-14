import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
})
export class AlarmComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    let veh = JSON.parse(localStorage.getItem('access_veh'));
    this.http.get(`/htkjapp/htkjapp/statCtrl/getFaultData/${veh.vid}/2`).subscribe((data: Result) => {
      this.dataList = data.data;
      console.log(this.dataList)
    });
  }

  dataList: Array<any> = [];

}
