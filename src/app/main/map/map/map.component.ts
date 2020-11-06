import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastService } from 'src/app/services/toast.service';
import { UtilService } from 'src/app/services/util.service';
declare var BMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;
  dataList: Array<any>;
  shopList: Array<any> = [
    { name: '鸿宇汽配', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, img: 1, item: '24小时营业' },
    { name: '宏盛汽配（进乡街店）', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, img: 2, item: '原厂配件' },
    { name: '远洋汽配', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, img: 3, item: '1年售后' },
    { name: '金杰汽配商行', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, img: 4, item: '7天零部件包换' },
    { name: '菲鸣汽车电器', score: this.util.getIntRandom(35, 50) / 10, mile: this.util.getIntRandom(0, 50) / 10, img: 5, item: '免收工时费' },
  ];
  dataTotal: number;

  constructor(private geolocation: Geolocation,
    private toast: ToastService,
    private http: HttpClient,
    private util: UtilService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.map = new BMap.Map(this.mapContainer.nativeElement);
    this.map.addEventListener('tilesloaded', () => {
      let centerPoint = this.map.getCenter();
      this.getData(centerPoint.lng, centerPoint.lat);
    });
    this.goBack();
  }
  goBack() {
    // let geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition((r) => {
    //   let point = r.point;
    //   let marker = new BMap.Marker(point);
    //   this.map.addOverlay(marker);
    //   this.map.centerAndZoom(point, 15);
    // }, { enableHighAccuracy: true })

    this.geolocation.getCurrentPosition().then((resp) => {
      let lng = resp.coords.longitude;
      let lat = resp.coords.latitude;
      let oldPoint = new BMap.Point(lng, lat);
      let oldPointArray = [];
      oldPointArray.push(oldPoint);
      let convertor = new BMap.Convertor();
      convertor.translate(oldPointArray, 1, 5, (data) => {
        if (data.status === 0) {
          let newPoint = data.points[0];
          let marker = new BMap.Marker(newPoint);
          this.map.addOverlay(marker);
          this.map.centerAndZoom(newPoint, 15);
        }
      })
    }).catch((error) => {
      this.toast.show('地图处理异常，请重新进入应用');
    });
  }
  big() {
    this.map.zoomIn();
  }
  small() {
    this.map.zoomOut();
  }
  getData(lng: number, lat: number) {
    this.http.post(`/mysql/common/query`, {
      db: 'iov',
      proc: 'bss_xp_findvehs',
      inPlat: false,
      inOem: false,
      param: [lng, lat]
    }).subscribe((data: any) => {
      this.map.clearOverlays();
      this.dataList = data.data;
      this.dataTotal = data.data.length;
      this.dataList.forEach(x => {
        this.drawVeh(x.c_lng, x.c_lat);
      });
    });
  }
  drawVeh(lng: number, lat: number) {
    let point = new BMap.Point(lng, lat);
    let marker = new BMap.Marker(point);
    this.map.addOverlay(marker);
  }



}
