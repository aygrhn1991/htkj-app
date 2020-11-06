import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-intention-order',
  templateUrl: './intention-order.component.html',
  styleUrls: ['./intention-order.component.scss'],
})
export class IntentionOrderComponent implements OnInit {

  dataList: Array<any> = [
    { name: '鸿宇汽配', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, money: this.util.getIntRandom(10, 40) * 10, goto: true, address: '南岗区龙运汽配城A区05', time: '营业中  24小时营业' },
    { name: '宏盛汽配（进乡街店）', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, money: this.util.getIntRandom(10, 40) * 10, goto: false, address: '香坊区进乡街33号', time: '营业中  周一至周日 08:00-20:00' },
    { name: '远洋汽配', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, money: this.util.getIntRandom(10, 40) * 10, goto: false, address: '南岗区同江南路29号', time: '营业中  周一至周日 08:00-20:00' },
    { name: '金杰汽配商行', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, money: this.util.getIntRandom(10, 40) * 10, goto: false, address: '香坊区G202黑大线', time: '营业中  24小时营业' },
    { name: '菲鸣汽车电器', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, money: this.util.getIntRandom(10, 40) * 10, goto: false, address: '南岗区龙运汽配城C区02', time: '营业中  周一至周日 08:00-20:00' },
  ];

  constructor(private util: UtilService) { }

  ngOnInit() { }

}
