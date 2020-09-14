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
    let veh = JSON.parse(localStorage.getItem('access_veh'));
    this.search.vid = veh.vid;
    this.getData();
  }

  @ViewChild('chart11', null) chart11: ElementRef;
  @ViewChild('chart12', null) chart12: ElementRef;
  @ViewChild('chart13', null) chart13: ElementRef;
  @ViewChild('chart14', null) chart14: ElementRef;
  @ViewChild('chart15', null) chart15: ElementRef;
  @ViewChild('chart16', null) chart16: ElementRef;
  @ViewChild('chart17', null) chart17: ElementRef;
  @ViewChild('chart18', null) chart18: ElementRef;
  @ViewChild('chart19', null) chart19: ElementRef;
  @ViewChild('chart110', null) chart110: ElementRef;
  @ViewChild('chart111', null) chart111: ElementRef;
  @ViewChild('chart112', null) chart112: ElementRef;

  @ViewChild('chart21', null) chart21: ElementRef;
  @ViewChild('chart22', null) chart22: ElementRef;
  @ViewChild('chart23', null) chart23: ElementRef;
  @ViewChild('chart24', null) chart24: ElementRef;
  @ViewChild('chart25', null) chart25: ElementRef;
  @ViewChild('chart26', null) chart26: ElementRef;
  @ViewChild('chart27', null) chart27: ElementRef;

  @ViewChild('chart31', null) chart31: ElementRef;
  @ViewChild('chart32', null) chart32: ElementRef;
  @ViewChild('chart33', null) chart33: ElementRef;
  @ViewChild('chart34', null) chart34: ElementRef;

  tab: number = 1;
  time: number = 1;
  search: Search = new Search();

  selectTab(e) {
    this.tab = e.detail.value;
    this.getData();
  }
  selectTime(e) {
    this.time = e;
    this.getData();
  }

  getData() {
    if (this.time == 1) {
      this.search.datetime1 = this.util.getDayStart(this.util.addDay(new Date(), -7));
      this.search.datetime2 = this.util.getDayEnd(this.util.addDay(new Date(), -1));
    } else if (this.time == 2) {
      this.search.datetime1 = this.util.getDayStart(this.util.addMonth(new Date(), -1));
      this.search.datetime2 = this.util.getDayEnd(this.util.addDay(new Date(), -1));
    } else if (this.time == 3) {
      this.search.datetime1 = this.util.getDayStart(this.util.addYear(new Date(), -1));
      this.search.datetime2 = this.util.getDayEnd(this.util.addDay(new Date(), -1));
    } else { }
    if (this.tab == 1) {
      this.http.get(`/vehday/vehdayCtrl/queryVehDayData/1/${this.search.vid}/${this.search.datetime1.getTime()}/${this.search.datetime2.getTime()}`).subscribe((data: Result) => {
        let dates = [];
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
        let air_in_flow_3 = [[], [], []];
        let dpf_3 = [[], [], []];
        let ect_3 = [[], [], []];
        for (let i = 0; i < (this.search.datetime2.getTime() - this.search.datetime1.getTime()) / (24 * 3600 * 1000); i++) {
          let date = this.util.dateToYYYYMMDD(this.util.addDay(this.search.datetime1, i));
          let d = data.data.filter(x => { return this.util.dateToYYYYMMDD(new Date(x.C_ATTIME)) == date; });
          dates.push(this.util.dateToMMDD(this.util.stringToDate(date)));
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
        echarts.init(this.chart11.nativeElement).setOption(this.chartService.getMultipleLineChartOption('车速统计', '日期', '车速(km/h)', 'km/h', legend, dates, speed_3));
        echarts.init(this.chart12.nativeElement).setOption(this.chartService.getMultipleLineChartOption('发动机净输出扭矩统计', '日期', '扭矩(N·m)', 'N·m', legend, dates, eng_torque_3));
        echarts.init(this.chart13.nativeElement).setOption(this.chartService.getMultipleLineChartOption('摩擦扭矩统计', '日期', '扭矩(N·m)', 'N·m', legend, dates, eng_frictiontorque_3));
        echarts.init(this.chart14.nativeElement).setOption(this.chartService.getMultipleLineChartOption('发动机转速统计', '日期', '转速(rpm)', 'rpm', legend, dates, eng_speed_3));
        echarts.init(this.chart15.nativeElement).setOption(this.chartService.getMultipleLineChartOption('发动机燃料流量统计', '日期', '流量(L/h)', 'L/h', legend, dates, eng_fuel_3));
        echarts.init(this.chart16.nativeElement).setOption(this.chartService.getMultipleLineChartOption('SCR上游NOx传感器输出值统计', '日期', 'ppm', 'ppm', legend, dates, scr_up_3));
        echarts.init(this.chart17.nativeElement).setOption(this.chartService.getMultipleLineChartOption('SCR下游NOx传感器输出值统计', '日期', 'ppm', 'ppm', legend, dates, scr_down_3));
        echarts.init(this.chart18.nativeElement).setOption(this.chartService.getMultipleLineChartOption('SCR入口温度统计', '日期', '温度(℃)', '(℃)', legend, dates, scr_in_temp_3));
        echarts.init(this.chart19.nativeElement).setOption(this.chartService.getMultipleLineChartOption('SCR出口温度统计', '日期', '温度(℃)', '(℃)', legend, dates, scr_out_temp_3));
        echarts.init(this.chart110.nativeElement).setOption(this.chartService.getMultipleLineChartOption('进气量统计', '日期', '进气量(kg/h)', 'kg/h', legend, dates, air_in_flow_3));
        echarts.init(this.chart111.nativeElement).setOption(this.chartService.getMultipleLineChartOption('DPF压差统计', '日期', '压差(kPa)', 'kPa', legend, dates, dpf_3));
        echarts.init(this.chart112.nativeElement).setOption(this.chartService.getMultipleLineChartOption('发动机冷却液温度统计', '日期', '温度(℃)', '(℃)', legend, dates, ect_3));
      })
    } else if (this.tab == 2) {
      this.http.get(`/vehday/vehdayCtrl/queryVehDayData/1/${this.search.vid}/${this.search.datetime1.getTime()}/${this.search.datetime2.getTime()}`).subscribe((data: Result) => {
        let dates = [];
        let dur = [];
        let mile = [];
        let oil = [];
        let nox = [];
        let dataCount = [];
        let fault = [];
        for (let i = 0; i < (this.search.datetime2.getTime() - this.search.datetime1.getTime()) / (24 * 3600 * 1000); i++) {
          let date = this.util.dateToYYYYMMDD(this.util.addDay(this.search.datetime1, i));
          let d = data.data.filter(x => { return this.util.dateToYYYYMMDD(new Date(x.C_ATTIME)) == date; });
          dates.push(this.util.dateToMMDD(this.util.stringToDate(date)));
          dur.push(d.length == 0 ? 0 : d[0].C_TIME);
          mile.push(d.length == 0 ? 0 : d[0].C_MIL);
          oil.push(d.length == 0 ? 0 : d[0].C_OIL);
          nox.push(d.length == 0 ? 0 : d[0].C_SCRDOWN_R + d[0].C_SCRDOWN_D);
          fault.push(d.length == 0 ? 0 : d[0].C_DTC_NUM);
          dataCount.push(d.length == 0 ? 0 : d[0].C_ENGNUM);
        }
        echarts.init(this.chart21.nativeElement).setOption(this.chartService.getBarChartOption('月上线时长', '日期', '时长(s)', '号', 's', dates, dur));
        echarts.init(this.chart22.nativeElement).setOption(this.chartService.getBarChartOption('月行驶里程', '日期', '里程(km)', '号', 'km', dates, mile));
        echarts.init(this.chart23.nativeElement).setOption(this.chartService.getBarChartOption('月行驶油耗', '日期', '油耗(L)', '号', 'L', dates, oil));
        echarts.init(this.chart24.nativeElement).setOption(this.chartService.getBarChartOption('月行驶排放', '日期', '排放(g)', '号', 'g', dates, nox));
        echarts.init(this.chart25.nativeElement).setOption(this.chartService.getBarChartOption('月上传数据', '日期', '数据(条)', '号', '条', dates, dataCount));
        echarts.init(this.chart26.nativeElement).setOption(this.chartService.getBarChartOption('月故障', '日期', '故障(次)', '号', '次', dates, fault));
      })
      //故障码密度
      this.http.get(`/vehday/vehdayCtrl/queryVehDayData/4/${this.search.vid}/${this.search.datetime1.getTime()}/${this.search.datetime2.getTime()}`).subscribe((data: Result) => {
        let fault_data = [];
        data.data.forEach(x => {
          fault_data.push({ name: x.c_code, value: x.c_num });
        });
        echarts.init(this.chart27.nativeElement).setOption(this.chartService.getPieChartOption('故障码密度', 5, fault_data));
      });
    } else if (this.tab == 3) {
      //车速-时长、里程
      this.http.get(`/vehday/vehdayCtrl/queryVehDayData/6/${this.search.vid}/${this.search.datetime1.getTime()}/${this.search.datetime2.getTime()}`).subscribe((data: Result) => {
        let speed_x = [];
        let speed_duration_y = [];
        let speed_mile_y = [];
        data.data.forEach(x => {
          speed_x.push(x.c_spd);
          speed_duration_y.push(x.rut);
          speed_mile_y.push(x.mil);
        });
        echarts.init(this.chart31.nativeElement).setOption(this.chartService.getLineChartOption('车速-时长', '车速(km/h)', '时长(s)', 'km/h', 's', speed_x, speed_duration_y));
        echarts.init(this.chart32.nativeElement).setOption(this.chartService.getLineChartOption('车速-里程', '车速(km/h)', '里程(km)', 'km/h', 'km', speed_x, speed_mile_y));
      });
      //车速-油耗
      this.http.get(`/vehday/vehdayCtrl/querySpdOil/0/${this.search.vid}/${this.search.datetime1.getTime()}/${this.search.datetime2.getTime()}`).subscribe((data: Result) => {
        let speed_x = [];
        let speed_oil_y = [];
        data.data.forEach(x => {
          speed_x.push(x.c_spd);
          speed_oil_y.push(x.oil);
        });
        echarts.init(this.chart33.nativeElement).setOption(this.chartService.getLineChartOption('车速-油耗', '车速(km/h)', '油耗(L)', 'km/h', 'L', speed_x, speed_oil_y));
      });
      //车速-排放
      this.http.get(`/vehday/vehdayCtrl/querySpdNox/0/${this.search.vid}/${this.search.datetime1.getTime()}/${this.search.datetime2.getTime()}`).subscribe((data: Result) => {
        let speed_x = [];
        let speed_nox_y = [];
        data.data.forEach(x => {
          speed_x.push(x.c_spd);
          speed_nox_y.push(x.nox);
        });
        echarts.init(this.chart34.nativeElement).setOption(this.chartService.getLineChartOption('车速-排放', '车速(km/h)', '排放(g)', 'km/h', 'g', speed_x, speed_nox_y));
      });
    } else { }
  }

}
