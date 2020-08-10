import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { UtilService } from './util.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private util: UtilService,
    private http: HttpClient) {
    if (!this.util.isNull(localStorage.getItem('access_token'))) {
      this.getUser().subscribe((data: Result) => {
        this.makeUser(data.data);
      });
    }
  }

  getUser(): Observable<Object> {
    return this.http.get(`/htkjapp/htkjapp/getUserInfo`);
  }

  makeUser(data: any): void {
    //数据映射
    let user = new UserModel();
    user.id = data.id;
    user.name = data.name;
    user.phone = data.phone;
    //存储&设置当前登录用户
    localStorage.setItem('access_user', JSON.stringify(user));
  }

}
