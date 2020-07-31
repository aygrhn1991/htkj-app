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
    setTimeout(()=>{
      this.map = new BMap.Map(this.mapContainer.nativeElement);
      let point = new BMap.Point(116.39, 39.90);
      this.map.centerAndZoom(point, 15);
      this.map.enableScrollWheelZoom(true);
      this.map.setMapStyle({ style: 'midnight' });
      let marker = new BMap.Marker(point);
      this.map.addOverlay(marker); 
    },2000);
    

  }

  @ViewChild('map', null) mapContainer: ElementRef;
  map: any;

}
