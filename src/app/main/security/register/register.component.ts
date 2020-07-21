import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { SecurityService } from 'src/app/services/security.service';
import { VehService } from 'src/app/services/veh.service';
import { Result } from 'src/app/models/result.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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
    if (this.util.isNull(this.user.phone) || this.user.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    this._phone = this.user.phone;
    this._code = this.util.getIntRandom(1000, 10000);
    this.http.get(`/r.json`).subscribe((data: Result) => {
      this.toast.show(data.msg);
      if (data.successed) {
        this.seconds = 5;
        this.counter();
      }
    })
  }
  register() {
    if (this.user.agreement == false) {
      this.toast.show('请阅读并同意《航天科技云终端用户服务协议》');
      return;
    }
    if (this.util.isNull(this.user.phone) || this.user.phone.length != 11) {
      this.toast.show('请填写正确的手机号');
      return;
    }
    if (this.util.isNull(this.user.code) || this.user.code.toString().length != 4) {
      this.toast.show('请填写正确的验证码');
      return;
    }
    if (this._phone == this.user.phone && this._code == this.user.code) {
      this.http.get(`/r.json`).subscribe((data: Result) => {
        this.toast.show(data.msg);
        if (data.successed) {
          localStorage.setItem('access_token', data.data);
          this.securityService.getUser().subscribe((data: Result) => {
            this.securityService.makeUser(data.data);
            this.router.navigate(['/security/bind']);
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
