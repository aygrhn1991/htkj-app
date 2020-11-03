import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastService } from 'src/app/services/toast.service';
declare var BMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;

  constructor(private geolocation: Geolocation,
    private toast: ToastService) { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    this.map = new BMap.Map(this.mapContainer.nativeElement);
    this.map.addEventListener('tilesloaded', () => {
      let centerPoint = this.map.getCenter();
      console.log('获取地图中心:' + centerPoint.lng + ',' + centerPoint.lat);
    });
    this.goBack();
  }
  goBack() {
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition((r) => {
      let point = r.point;
      let marker = new BMap.Marker(point);
      this.map.addOverlay(marker);
      this.map.centerAndZoom(point, 15);
    }, { enableHighAccuracy: true })

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   let lng = resp.coords.longitude;
    //   let lat = resp.coords.latitude;
    //   let oldPoint = new BMap.Point(lng, lat);
    //   let oldPointArray = [];
    //   oldPointArray.push(oldPoint);
    //   let convertor = new BMap.Convertor();
    //   convertor.translate(oldPointArray, 1, 5, (data) => {
    //     if (data.status === 0) {
    //       let newPoint = data.points[0];
    //       let marker = new BMap.Marker(newPoint);
    //       this.map.addOverlay(marker);
    //       this.map.centerAndZoom(newPoint, 15);
    //     }
    //   })
    // }).catch((error) => {
    //   this.toast.show('地图处理异常，请重新进入应用');
    // });
  }
  big() {
    this.map.zoomIn();
  }
  small() {
    this.map.zoomOut();
  }



  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

}
