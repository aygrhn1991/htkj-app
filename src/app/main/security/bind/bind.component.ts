import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/models/result.model';
import { ActivatedRoute, Router } from '@angular/router';
import { VehModel } from 'src/app/models/veh.model';
import { VehService } from 'src/app/services/veh.service';

@Component({
  selector: 'app-bind',
  templateUrl: './bind.component.html',
  styleUrls: ['./bind.component.scss'],
})
export class BindComponent implements OnInit {

  ionViewWillEnter() {
    this.ngOnInit();
  }

  constructor(private util: UtilService,
    private toast: ToastService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private vehService: VehService) { }

  ngOnInit(): void {
    this.from = this.route.snapshot.params['from'];
    this.transferData();
  }

  from: number = 0;//来源：0注册进入需绑定完成需跳转首页，1功能菜单进入绑定完成界面不动
  vin: string = null;
  dataList: Array<VehModel> = [];

  transferData() {
    let vehsJson = localStorage.getItem('access_vehs');
    let vehJson = localStorage.getItem('access_veh');
    if (!this.util.isNull(vehsJson) && !this.util.isNull(vehJson)) {
      this.dataList = JSON.parse(vehsJson);
      let veh = JSON.parse(vehJson);
      this.dataList.forEach(x => {
        if (x.vid == veh.vid) {
          x.select = true;
        } else {
          x.select = false;
        }
      })
    }
  }

  bind() {
    if (this.util.isNull(this.vin) || this.vin.length != 17) {
      this.toast.show('请输入正确的VIN');
      return;
    }
    this.http.get(`/htkjapp/htkjapp/bindVeh/${this.vin}`).subscribe((data: Result) => {
      this.toast.show(data.msg);
      if (data.successed) {
        this.vehService.getVeh().subscribe((data: Result) => {
          this.vehService.makeVeh(data.data);
          this.transferData();
          if (this.from == 0) {
            this.router.navigate(['/tabs/home/index']);
          }
        });
      }
    });
  }
  unBind(e) {
    this.http.get(`/htkjapp/htkjapp/unbindVeh/${e.vin}`).subscribe((data: Result) => {
      this.toast.show(data.msg);
      if (data.successed) {
        this.vehService.getVeh().subscribe((data: Result) => {
          this.vehService.makeVeh(data.data);
          this.transferData();
        });
      }
    });
  }
  changeBind(e) {
    this.dataList.forEach(x => {
      if (x.vid == e.vid) {
        localStorage.setItem('access_veh', JSON.stringify(e));
      }
    })
    this.transferData();
  }

}
