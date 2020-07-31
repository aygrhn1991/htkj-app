import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { ToastService } from 'src/app/services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Result } from 'src/app/models/result.model';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';

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
    private router: Router,) { }

  ngOnInit(): void {
    this.from = this.route.snapshot.params['from'];
    console.log(this.from);
  }
  
  from: number = 0;
  vin: string = null;
  bind() {
    if (this.util.isNull(this.vin) || this.vin.length != 17) {
      this.toast.show('请输入正确的VIN');
      return;
    }
    this.http.get(`/r.json`).subscribe((data: Result) => {
      this.toast.show(data.data);
      if (data.successed) {
        if (this.from == 0) {
          this.router.navigate(['/tabs/home/index']);
        }
      }
    });
  }




}
