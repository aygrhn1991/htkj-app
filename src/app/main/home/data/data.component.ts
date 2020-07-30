import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as echarts from 'echarts';
import { ChartService } from 'src/app/services/chart.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {

  @ViewChild('chart1', null) chart1: ElementRef;
  @ViewChild('chart2', null) chart2: ElementRef;
  @ViewChild('chart3', null) chart3: ElementRef;

  constructor(private chartService: ChartService,
    private util: UtilService) { }

  ngOnInit() {
    setTimeout(() => {
      this.makeChart();
    }, 1000)
  }
  makeChart() {
    let dataX = [];
    let dataY = [];
    let dataZ = [];
    for (let i = 0; i < 7; i++) {
      dataX.push(this.util.dateToMMDD(this.util.addDay(new Date(), -i)));
      dataY.push(this.util.getIntRandom(10, 100));
      dataZ.push({name:dataX[i],value:dataY[i]});
    }
    let chart1 = echarts.init(this.chart1.nativeElement);
    let option1 = this.chartService.getLineChartOption('里程统计', '日期', '里程', '', 'km', dataX, dataY);
    chart1.setOption(option1);
    let chart2 = echarts.init(this.chart2.nativeElement);
    let option2 = this.chartService.getBarChartOption('里程统计', '日期', '里程', '', 'km', dataX, dataY);
    chart2.setOption(option2);
    let chart3 = echarts.init(this.chart3.nativeElement);
    let option3 = this.chartService.getPieChartOption('故障统计', 5, dataZ);
    chart3.setOption(option3);
  }


  segmentChanged(){
    
  }
}
