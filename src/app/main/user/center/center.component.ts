import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.scss'],
})
export class CenterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_user');
    localStorage.removeItem('access_vehs');
    localStorage.removeItem('access_veh');
    this.router.navigate(['/security/login']);
  }

}