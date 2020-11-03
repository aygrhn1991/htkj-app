import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var BMap: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let map = new BMap.Map(this.mapContainer.nativeElement);
      let point = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(point, 12);

      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition((r) => {
        let mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        this.lng = r.point.lng;
        this.lat = r.point.lat;
        console.log('您的位置：' + r.point.lng + ',' + r.point.lat);
      }, { enableHighAccuracy: true })


      ////////////////////////
      // this.map = new BMap.Map(this.mapContainer.nativeElement);
      // let point = new BMap.Point(116.39, 39.90);
      // this.map.centerAndZoom(point, 15);
      // this.map.enableScrollWheelZoom(true);
      // // this.map.setMapStyle({ style: 'midnight' });
      // let marker = new BMap.Marker(point);
      // this.map.addOverlay(marker); 
    }, 1000);


  }

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;

  list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  lng;
  lat;

}
