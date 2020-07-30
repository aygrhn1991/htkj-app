import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BlankComponent } from '../../modules/blank/blank.component';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  { path: 'list', component: ListComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    ListComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ListModule { }
