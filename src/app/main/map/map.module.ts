import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BlankComponent } from 'src/app/modules/blank/blank.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', redirectTo: 'map' },
  { path: 'map', component: MapComponent, },
  { path: 'order/:to', component: OrderComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    MapComponent,
    OrderComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MapModule { }
