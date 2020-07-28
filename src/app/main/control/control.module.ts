import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './control/control.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BlankComponent } from 'src/app/modules/blank/blank.component';

const routes: Routes = [
  { path: '', redirectTo: 'control' },
  { path: 'control', component: BlankComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    ControlComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ControlModule { }
