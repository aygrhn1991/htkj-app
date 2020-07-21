import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { SecurityService } from 'src/app/services/security.service';
import { UserModel } from 'src/app/models/user.model';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  user: UserModel = new UserModel();
  _phone: string = null;
  _code: number = null;
  seconds: number = 0;
  secondsMsg: string = '';

  constructor(private router: Router,
    private util: UtilService,
    private toast: ToastService,
    private http: HttpClient,
    private securityService: SecurityService) { }

  ngOnInit() { }

  sendPhoneCode() {
    console.log(this.user)
    if (this.util.isNull(this.user.phone) || this.user.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phone = this.user.phone;
    this._code = this.util.getIntRandom(1000, 10000);
    this.http.get(`/r`).subscribe((data: Result) => {
      this.toast.show(data.msg);
      if (data.successed) {
        this.seconds = 5;
        this.counter();
      }
    })
  }
  login() {
    // if (this.util.isNull(this.user.phone) || this.user.phone.length != 11) {
    //   this.toast.show('请填写正确的手机号');
    //   return;
    // }
    // if (this.util.isNull(this.user.code) || this.user.code.toString().length != 4) {
    //   this.toast.show('请填写正确的验证码');
    //   return;
    // }
    // if (this._phone == this.user.phone && this._code == this.user.code) {
    //   this.http.login(this.user.phone).subscribe((d: Result) => {
    //     this.toast.show(d.message);
    //     if (d.success) {
    //       this.securityService.user.info = new UserInfo();
    //       this.securityService.user.info.token = d.data;
    //       this.securityService.updateUser();
    //       this.http.getUserInfo(this.user.phone).subscribe((d: Result) => {
    //         if (d.success) {
    //           this.securityService.user.info.id = d.data.C_ID;
    //           this.securityService.user.info.phone = d.data.C_PHONE;
    //           this.securityService.user.info.name = d.data.C_NAME;
    //           this.securityService.updateUser();
    //           this.http.getBindVins(this.securityService.user.info.id).subscribe((d: Result) => {
    //             if (d.success) {
    //               this.securityService.user.vins = d.data.map(x => {
    //                 let veh = new VehInfo();
    //                 veh.id = x.C_ID;
    //                 veh.vin = x.C_VIN;
    //                 veh.vehno = x.C_VEHNO;
    //                 return veh;
    //               })
    //               this.securityService.user.vin = d.data.length != 0 ? this.securityService.user.vins[0] : new VehInfo();
    //               this.securityService.updateUser();
    //               this.router.navigate(['/tabs/home']);
    //             }
    //           })
    //         }
    //       });
    //     }
    //   })
    // } else {
    //   this.toast.show('验证码错误');
    // }
  }
  counter() {
    console.log(this.seconds);
    this.seconds--;
    if (this.seconds > 0) {
      this.secondsMsg = '(' + this.seconds + ')';
      setTimeout(() => {
        this.counter()
      }, 1000);
    } else {
      this.secondsMsg = '';
    }
  }

}
