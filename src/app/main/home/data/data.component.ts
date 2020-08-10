import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartService } from 'src/app/services/chart.service';
import { UtilService } from 'src/app/services/util.service';
import { HttpClient } from '@angular/common/http';
import { Search, Result } from 'src/app/models/result.model';
import * as echarts from 'echarts';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {

  constructor(private chartService: ChartService,
    private util: UtilService,
    private http: HttpClient) { }

  ngOnInit() {
    setTimeout(() => {
      this.makeChart();
    }, 1000);
    this.reset();
  }

  @ViewChild('chart1', null) chart1: ElementRef;
  @ViewChild('chart2', null) chart2: ElementRef;
  @ViewChild('chart3', null) chart3: ElementRef;

  tag: number = 1;

  makeChart() {
    let dataX = [];
    let dataY = [];
    let dataZ = [];
    for (let i = 0; i < 7; i++) {
      dataX.push(this.util.dateToMMDD(this.util.addDay(new Date(), -i)));
      dataY.push(this.util.getIntRandom(10, 100));
      dataZ.push({ name: dataX[i], value: dataY[i] });
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


  segmentChanged(e) {
    this.tag = e.detail.value;
    setTimeout(() => {
      this.makeChart();
    }, 1000);
  }


  data: any = {};

  day_dur: any;
  day_mile: any;
  day_oil: any;
  day_nox: any;
  day_data: any;
  day_fault: any;

  day_3_speed: any;
  day_3_eng_torque: any;
  day_3_eng_frictiontorque: any;
  day_3_eng_speed: any;
  day_3_eng_fuel: any;
  day_3_scr_up: any;
  day_3_scr_down: any;
  day_3_scr_in_temp: any;
  day_3_scr_out_temp: any;
  day_3_reactant: any;
  day_3_air_in_flow: any;
  day_3_dpf: any;
  day_3_ect: any;

  speed_duration: any;
  speed_mile: any;
  speed_oil: any;
  speed_nox: any;
  fault: any;
  km100_oil: any;
  km100_nox: any;
  km100_scr: any;

  //#region 搜索区
  search: Search = new Search();
  getData() {
    // if (this.util.isNull(this.search.vid)) {
    //   this.notification.error('请输入VIN', null);
    //   return;
    // }
    this.http.get(`/vehday/vehdayCtrl/queryRunData/1/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      this.data = Object.assign(this.data, data.data[0]);
    })
    this.http.get(`/vehday/vehdayCtrl/queryIdling/1/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      this.data.d_dur = data.data[0].dur;
      this.data.d_oil = data.data[0].oil;
      this.data.d_scrdown = data.data[0].scrdown;
    })
    this.http.get(`/vehday/vehdayCtrl/queryVehDayData/1/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      let dates = [];
      let dur = [];
      let mile = [];
      let oil = [];
      let nox = [];
      let dataCount = [];
      let fault = [];

      let legend = ['最大值', '最小值', '平均值'];
      let speed_3 = [[], [], []];
      let eng_torque_3 = [[], [], []];
      let eng_frictiontorque_3 = [[], [], []];
      let eng_speed_3 = [[], [], []];
      let eng_fuel_3 = [[], [], []];
      let scr_up_3 = [[], [], []];
      let scr_down_3 = [[], [], []];
      let scr_in_temp_3 = [[], [], []];
      let scr_out_temp_3 = [[], [], []];
      let reactant_3 = [[], [], []];
      let air_in_flow_3 = [[], [], []];
      let dpf_3 = [[], [], []];
      let ect_3 = [[], [], []];

      let startDate = this.util.getMonthStartDay(this.search.datetime1);
      for (let i = 0; i < this.util.getMonthDay(this.search.datetime1); i++) {
        let date = this.util.dateToYYYYMMDD(this.util.addDay(startDate, i));
        let d = data.data.filter(x => { return this.util.dateToYYYYMMDD(new Date(x.C_ATTIME)) == date; });
        dates.push(this.util.stringToDate(date).getDate());
        dur.push(d.length == 0 ? 0 : d[0].C_TIME);
        mile.push(d.length == 0 ? 0 : d[0].C_MIL);
        oil.push(d.length == 0 ? 0 : d[0].C_OIL);
        nox.push(d.length == 0 ? 0 : d[0].C_SCRDOWN_R + d[0].C_SCRDOWN_D);
        fault.push(d.length == 0 ? 0 : d[0].C_DTC_NUM);
        dataCount.push(d.length == 0 ? 0 : d[0].C_ENGNUM);

        speed_3[0].push(d.length == 0 ? 0 : d[0].C_VEHSPDMAX);
        speed_3[1].push(d.length == 0 ? 0 : d[0].C_VEHSPDMIN);
        speed_3[2].push(d.length == 0 ? 0 : d[0].C_VEHSPDAVG);
        eng_torque_3[0].push(d.length == 0 ? 0 : d[0].C_ENGTORQUEMAX);
        eng_torque_3[1].push(d.length == 0 ? 0 : d[0].C_ENGTORQUEMIN);
        eng_torque_3[2].push(d.length == 0 ? 0 : d[0].C_ENGTORQUEAVG);
        eng_frictiontorque_3[0].push(d.length == 0 ? 0 : d[0].C_FRICTIONTORQUEMAX);
        eng_frictiontorque_3[1].push(d.length == 0 ? 0 : d[0].C_FRICTIONTORQUEMIN);
        eng_frictiontorque_3[2].push(d.length == 0 ? 0 : d[0].C_FRICTIONTORQUEAVG);
        eng_speed_3[0].push(d.length == 0 ? 0 : d[0].C_ENGSPDMAX);
        eng_speed_3[1].push(d.length == 0 ? 0 : d[0].C_ENGSPDMIN);
        eng_speed_3[2].push(d.length == 0 ? 0 : d[0].C_ENGSPDAVG);
        eng_fuel_3[0].push(d.length == 0 ? 0 : d[0].C_ENGFUELMAX);
        eng_fuel_3[1].push(d.length == 0 ? 0 : d[0].C_ENGFUELMIN);
        eng_fuel_3[2].push(d.length == 0 ? 0 : d[0].C_ENGFUELAVG);
        scr_up_3[0].push(d.length == 0 ? 0 : d[0].C_SCRUPVALMAX);
        scr_up_3[1].push(d.length == 0 ? 0 : d[0].C_SCRUPVALMIN);
        scr_up_3[2].push(d.length == 0 ? 0 : d[0].C_SCRUPVALAVG);
        scr_down_3[0].push(d.length == 0 ? 0 : d[0].C_SCRDOWNVALMAX);
        scr_down_3[1].push(d.length == 0 ? 0 : d[0].C_SCRDOWNVALMIN);
        scr_down_3[2].push(d.length == 0 ? 0 : d[0].C_SCRDOWNVALAVG);
        scr_in_temp_3[0].push(d.length == 0 ? 0 : d[0].C_SCRINTEMPMAX);
        scr_in_temp_3[1].push(d.length == 0 ? 0 : d[0].C_SCRINTEMPMIN);
        scr_in_temp_3[2].push(d.length == 0 ? 0 : d[0].C_SCRINTEMPAVG);
        scr_out_temp_3[0].push(d.length == 0 ? 0 : d[0].C_SCROUTTEMPMAX);
        scr_out_temp_3[1].push(d.length == 0 ? 0 : d[0].C_SCROUTTEMPMIN);
        scr_out_temp_3[2].push(d.length == 0 ? 0 : d[0].C_SCROUTTEMPAVG);
        reactant_3[0].push(d.length == 0 ? 0 : d[0].C_REACTANTMAX);
        reactant_3[1].push(d.length == 0 ? 0 : d[0].C_REACTANTMIN);
        reactant_3[2].push(d.length == 0 ? 0 : d[0].C_REACTANTAVG);
        air_in_flow_3[0].push(d.length == 0 ? 0 : d[0].C_AIRINFLOWMAX);
        air_in_flow_3[1].push(d.length == 0 ? 0 : d[0].C_AIRINFLOWMIN);
        air_in_flow_3[2].push(d.length == 0 ? 0 : d[0].C_AIRINFLOWAVG);
        dpf_3[0].push(d.length == 0 ? 0 : d[0].C_DPFMAX);
        dpf_3[1].push(d.length == 0 ? 0 : d[0].C_DPFMIN);
        dpf_3[2].push(d.length == 0 ? 0 : d[0].C_DPFAVG);
        ect_3[0].push(d.length == 0 ? 0 : d[0].C_ECTMAX);
        ect_3[1].push(d.length == 0 ? 0 : d[0].C_ECTMIN);
        ect_3[2].push(d.length == 0 ? 0 : d[0].C_ECTAVG);
      }
      this.day_dur = this.chartService.getBarChartOption('月上线时长', '日期', '时长(s)', '号', 's', dates, dur);
      this.day_mile = this.chartService.getBarChartOption('月行驶里程', '日期', '里程(km)', '号', 'km', dates, mile);
      this.day_oil = this.chartService.getBarChartOption('月行驶油耗', '日期', '油耗(L)', '号', 'L', dates, oil);
      this.day_nox = this.chartService.getBarChartOption('月行驶排放', '日期', '排放(g)', '号', 'g', dates, nox);
      this.day_data = this.chartService.getBarChartOption('月上传数据', '日期', '数据(条)', '号', '条', dates, dataCount);
      this.day_fault = this.chartService.getBarChartOption('月故障', '日期', '故障(次)', '号', '次', dates, fault);

      // this.day_3_speed = this.chartService.getMultipleLineChartOption('车速统计', '日期', '车速(km/h)', 'km/h', legend, dates, speed_3);
      // this.day_3_eng_torque = this.chartService.getMultipleLineChartOption('发动机净输出扭矩统计', '日期', '扭矩(N·m)', 'N·m', legend, dates, eng_torque_3);
      // this.day_3_eng_frictiontorque = this.chartService.getMultipleLineChartOption('摩擦扭矩统计', '日期', '扭矩(N·m)', 'N·m', legend, dates, eng_frictiontorque_3);
      // this.day_3_eng_speed = this.chartService.getMultipleLineChartOption('发动机转速统计', '日期', '转速(rpm)', 'rpm', legend, dates, eng_speed_3);
      // this.day_3_eng_fuel = this.chartService.getMultipleLineChartOption('发动机燃料流量统计', '日期', '流量(L/h)', 'L/h', legend, dates, eng_fuel_3);
      // this.day_3_scr_up = this.chartService.getMultipleLineChartOption('SCR上游NOx传感器输出值统计', '日期', 'ppm', 'ppm', legend, dates, scr_up_3);
      // this.day_3_scr_down = this.chartService.getMultipleLineChartOption('SCR下游NOx传感器输出值统计', '日期', 'ppm', 'ppm', legend, dates, scr_down_3);
      // this.day_3_scr_in_temp = this.chartService.getMultipleLineChartOption('SCR入口温度统计', '日期', '温度(℃)', '(℃)', legend, dates, scr_in_temp_3);
      // this.day_3_scr_out_temp = this.chartService.getMultipleLineChartOption('SCR出口温度统计', '日期', '温度(℃)', '(℃)', legend, dates, scr_out_temp_3);
      // this.day_3_reactant = this.chartService.getMultipleLineChartOption('反应剂余量统计', '日期', '余量(%)', '%', legend, dates, reactant_3);
      // this.day_3_air_in_flow = this.chartService.getMultipleLineChartOption('进气量统计', '日期', '进气量(kg/h)', 'kg/h', legend, dates, air_in_flow_3);
      // this.day_3_dpf = this.chartService.getMultipleLineChartOption('DPF压差统计', '日期', '压差(kPa)', 'kPa', legend, dates, dpf_3);
      // this.day_3_ect = this.chartService.getMultipleLineChartOption('发动机冷却液温度统计', '日期', '温度(℃)', '(℃)', legend, dates, ect_3);
    })
    //车速-时长、里程
    this.http.get(`/vehday/vehdayCtrl/queryVehDayData/6/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      let speed_x = [];
      let speed_duration_y = [];
      let speed_mile_y = [];
      data.data.forEach(x => {
        speed_x.push(x.c_spd);
        speed_duration_y.push(x.rut);
        speed_mile_y.push(x.mil);
      });
      this.speed_duration = this.chartService.getLineChartOption('车速-时长', '车速(km/h)', '时长(s)', 'km/h', 's', speed_x, speed_duration_y);
      this.speed_mile = this.chartService.getLineChartOption('车速-里程', '车速(km/h)', '里程(km)', 'km/h', 'km', speed_x, speed_mile_y);
    });
    //车速-油耗
    this.http.get(`/vehday/vehdayCtrl/querySpdOil/0/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      let speed_x = [];
      let speed_oil_y = [];
      data.data.forEach(x => {
        speed_x.push(x.c_spd);
        speed_oil_y.push(x.oil);
      });
      this.speed_oil = this.chartService.getLineChartOption('车速-油耗', '车速(km/h)', '油耗(L)', 'km/h', 'L', speed_x, speed_oil_y);
    });
    //车速-排放
    this.http.get(`/vehday/vehdayCtrl/querySpdNox/0/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      let speed_x = [];
      let speed_nox_y = [];
      data.data.forEach(x => {
        speed_x.push(x.c_spd);
        speed_nox_y.push(x.nox);
      });
      this.speed_nox = this.chartService.getLineChartOption('车速-排放', '车速(km/h)', '排放(g)', 'km/h', 'g', speed_x, speed_nox_y);
    });
    //故障码密度
    this.http.get(`/vehday/vehdayCtrl/queryVehDayData/4/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
      let fault_data = [];
      data.data.forEach(x => {
        fault_data.push({ name: x.c_code, value: x.c_num });
      });
      this.fault = this.chartService.getPieChartOption('故障码密度', 5, fault_data);
    });
    // //百公里油耗&排放&SCR转化
    // this.http.get(`/vehday/vehdayCtrl/queryRunData/0/${this.search.vid}/${this.util.getDayStart(this.util.getMonthStartDay(this.search.datetime1)).getTime()}/${this.util.getDayEnd(this.util.getMonthEndDay(this.search.datetime1)).getTime()}`).subscribe((data: Result) => {
    //   let km100_x = [];
    //   let km100_oil_y = [];
    //   let km100_nox_y = [];
    //   let km100_scr_y = [];
    //   data.data.forEach(x => {
    //     km100_x.push(this.util.stringToDate(x.dt).getDate());
    //     km100_oil_y.push(x.oilper);
    //     km100_nox_y.push(x.scrper);
    //     km100_scr_y.push(x.noxper);
    //   });
    //   this.km100_oil = this.chartService.getLineChartOption('月百公里排放', '日期', '百公里排放', 'g', km100_x, km100_nox_y);
    //   this.km100_nox = this.chartService.getLineChartOption('月百公里油耗', '日期', '百公里油耗', 'L', km100_x, km100_oil_y);
    //   this.km100_scr = this.chartService.getLineChartOption('月百公里SCR转化', '日期', '百公里SCR转化', 'g', km100_x, km100_scr_y);
    // });
  }
  reset(): void {
    this.search = new Search();
    this.search.datetime1 = this.util.addMonth(new Date(), -1);
    this.search.vid = JSON.parse(localStorage.getItem('access_veh')).vid;
    this.getData();
  }
  //#endregion

}
