import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {

  to: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.to = parseInt(this.route.snapshot.params['to']);
  }

}
