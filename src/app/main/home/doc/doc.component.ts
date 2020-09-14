import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/models/result.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doc',
  templateUrl: './doc.component.html',
  styleUrls: ['./doc.component.scss'],
})
export class DocComponent implements OnInit {

  data: any = {};
  constructor(private http: HttpClient) { }

  ngOnInit() {
    let veh = JSON.parse(localStorage.getItem('access_veh'));
    this.http.get(`/htkjapp/htkjapp/statCtrl/getVehData/${veh.vid}/1`).subscribe((data: Result) => {
      this.data = data.data;
      console.log(data.data);
    });
  }

}
