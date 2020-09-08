import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {

  constructor(private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }

  user: UserModel = new UserModel();

  checkUpdate() {
    this.toastService.show('功能暂停使用');
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_user');
    localStorage.removeItem('access_vehs');
    localStorage.removeItem('access_veh');
    this.router.navigate(['/security/login']);
  }

}