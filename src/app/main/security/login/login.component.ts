import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { SecurityService } from 'src/app/services/security.service';
import { UserModel } from 'src/app/models/user.model';
import { Result } from 'src/app/models/result.model';
import { VehService } from 'src/app/services/veh.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  ionViewWillEnter() {
    this.ngOnInit();
  }

  constructor(private router: Router,
    private util: UtilService,
    private toast: ToastService,
    private http: HttpClient,
    private securityService: SecurityService,
    private vehService: VehService) { }

  ngOnInit() { }

  user: UserModel = new UserModel();
  _phone: string = null;
  _code: number = null;
  seconds: number = 0;
  secondsMsg: string = '';

  sendPhoneCode() {
    if (this.util.isNull(this.user.phone) || this.user.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phone = this.user.phone;
    this._code = this.util.getIntRandom(1000, 10000);
    this.http.get(`/htkjapp/htkjapp/sendPhoneCode/${this._phone}/${this._code}`).subscribe((data: Result) => {
      this.toast.show(data.msg);
      if (data.successed) {
        this.seconds = 5;
        this.counter();
      }
    })
  }
  login() {
    if (this.util.isNull(this.user.phone) || this.user.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.user.code) || this.user.code.toString().length != 4) {
      this.toast.show('请填写正确的验证码');
      return;
    }
    if (this._phone == this.user.phone && this._code == this.user.code) {
      this.http.get(`/htkjapp/htkjapp/login/${this.user.phone}`).subscribe((data: Result) => {
        this.toast.show(data.msg);
        if (data.successed) {
          localStorage.setItem('access_token', data.data);
          this.securityService.getUser().subscribe((data: Result) => {
            if (data.successed) {
              this.securityService.makeUser(data.data);
              this.vehService.getVeh().subscribe((data: Result) => {
                if (data.successed) {
                  this.vehService.makeVeh(data.data);
                  this.router.navigate(['/tabs/home/index']);
                } else {
                  this.toast.show(data.msg);
                }
              });
            } else {
              this.toast.show(data.msg);
            }
          });
        }
      });
    } else {
      this.toast.show('验证码错误');
    }
  }
  counter() {
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
