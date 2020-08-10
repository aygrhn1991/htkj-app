import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/models/result.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehModel } from 'src/app/models/veh.model';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss'],
})
export class BindComponent implements OnInit {

  constructor(private util: UtilService,
    private toast: ToastService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.from = this.route.snapshot.params['from'];
    this.getData();
  }

  from: number = 0;//来源：0注册进入需绑定完成需跳转首页，1功能菜单进入绑定完成界面不动
  vin: string = null;
  dataList: Array<VehModel> = [];

  getData() {
    this.http.get(`/htkjapp/htkjapp/getUserVehs`).subscribe((data: Result) => {
      this.dataList = data.data;
      let veh = JSON.parse(localStorage.getItem('access_veh'));
      this.dataList.forEach(x => {
        if (x.vid == veh.vid) {
          x.select = true;
        } else {
          x.select = false;
        }
      })
    });
  }

  bind() {
    if (this.util.isNull(this.vin) || this.vin.length != 17) {
      this.toast.show('请输入正确的VIN');
      return;
    }
    this.http.get(`/htkjapp/htkjapp/bindVeh/${this.vin}`).subscribe((data: Result) => {
      this.toast.show(data.data);
      if (data.successed) {
        if (this.from == 0) {
          this.router.navigate(['/tabs/home/index']);
        } else {
          this.getData();
        }
      }
    });
  }

}
