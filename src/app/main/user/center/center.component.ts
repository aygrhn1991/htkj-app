import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('access_user'));
  }

  user: UserModel = new UserModel();

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_user');
    localStorage.removeItem('access_vehs');
    localStorage.removeItem('access_veh');
    this.router.navigate(['/security/login']);
  }

}