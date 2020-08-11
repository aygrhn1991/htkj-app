import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private colorAxis: string = '#063374';
  private colorList: Array<string> = ['#5dccff', '#10acf4', '#1786d4', '#1664ce', '#014bb0', '#013bb0', '#063188', '#002267', '#001d4e', '#02104e'];

  constructor() { }

  getLineChartOption(title: string, xName: string, yName: string, unitX: string, unitY: string, dataX: Array<any>, dataY: Array<any>) {
    let option = {
      color: this.colorList,
      title: {
        top: '5%',
        left: 'center',
        text: title,
        textStyle: { color: '#fff', fontSize: 14 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
        formatter: `{b}${unitX}<br>{c}${unitY}`
      },
      grid: {
        top: '25%',
        left: '5%',
        right: '15%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: xName,
        nameTextStyle: { color: '#fff' },
        boundaryGap: false,
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: this.colorAxis } },
        axisTick: { show: false },
        splitLine: { show: false },
        data: dataX,
      }],
      yAxis: [{
        type: 'value',
        name: yName,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: this.colorAxis } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorAxis } }
      }],
      series: [{
        type: 'line',
        areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: this.colorList[0] }, { offset: 1, color: 'transparent' }] } },
        data: dataY
      }]
    };
    return option;
  }
  getBarChartOption(title: string, xName: string, yName: string, unitX: string, unitY: string, dataX: Array<any>, dataY: Array<any>) {
    let option = {
      color: this.colorList,
      title: {
        top: '5%',
        left: 'center',
        text: title,
        textStyle: { color: '#fff', fontSize: 14 }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: `{b}${unitX}<br>{c}${unitY}`
      },
      grid: {
        top: '25%',
        left: '5%',
        right: '15%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: xName,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: this.colorAxis } },
        axisTick: { show: false },
        splitLine: { show: false },
        data: dataX,
      }],
      yAxis: [{
        type: 'value',
        name: yName,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: this.colorAxis } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorAxis } }
      }],
      series: [{
        type: 'bar',
        data: dataY
      }]
    };
    return option;
  }
  getPieChartOption(title: string, top: number, data: Array<any>) {
    let newData = data;
    if (top > 0 && top < data.length) {
      let left = 0;
      data.sort((a, b) => { return b.value - a.value });
      newData = data.slice(0, top);
      for (let i = 0; i < data.length; i++) {
        if ((i + 1) > top) {
          left += data[i].value;
        }
      }
      newData.push({ name: '其他', value: left });
    }
    let dataLegend = [];
    newData.forEach(x => {
      dataLegend.push(x.name);
    });
    let option = {
      color: this.colorList,
      title: {
        top: '5%',
        left: 'center',
        text: title,
        textStyle: { color: '#fff', fontSize: 14 }
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}<br>{c}<br>({d}%)'
      },
      legend: {
        orient: 'vertical',
        top: 'middle',
        right: '10%',
        textStyle: { color: '#fff' },
        data: dataLegend
      },
      series: [{
        type: 'pie',
        center: ['40%', '55%'],
        radius: [0, '65%'],
        label: { show: true, color: '#fff' },
        labelLine: { show: true, lineStyle: { color: '#fff' } },
        data: newData
      }]
    };
    return option;
  }
  getMultipleLineChartOption(title: string, xName: string, yName: string, unit: string, legend: Array<string>, dataX: Array<any>, dataY: Array<any>) {
    let series = [];
    for (let i = 0; i < legend.length; i++) {
      series.push({ name: legend[i], type: 'line', data: dataY[i] });
    }
    let option = {
      color: this.colorList,
      title: {
        top: '5%',
        left: 'center',
        text: title,
        textStyle: { color: '#fff', fontSize: 14 }
      },
      legend: {
        top: '15%',
        textStyle: { color: '#fff' },
        data: legend
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'line' },
      },
      grid: {
        top: '30%',
        left: '5%',
        right: '12%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        name: xName,
        nameTextStyle: { color: '#fff' },
        boundaryGap: false,
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: this.colorAxis } },
        axisTick: { show: false },
        splitLine: { show: false },
        data: dataX,
      }],
      yAxis: [{
        type: 'value',
        name: yName,
        nameTextStyle: { color: '#fff' },
        axisLabel: { color: '#fff' },
        axisLine: { lineStyle: { color: this.colorAxis } },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: this.colorAxis } }
      }],
      series: series
    };
    return option;
  }
}
