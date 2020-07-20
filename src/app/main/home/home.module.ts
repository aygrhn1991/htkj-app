import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DocComponent } from './doc/doc.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index', component: IndexComponent, },
  { path: 'doc', component: DocComponent, }
];

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule { }
