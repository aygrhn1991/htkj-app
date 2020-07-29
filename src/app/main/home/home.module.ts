import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DocComponent } from './doc/doc.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BlankComponent } from 'src/app/modules/blank/blank.component';
import { DataComponent } from './data/data.component';

const routes: Routes = [
  { path: '', redirectTo: 'index' },
  { path: 'index', component: IndexComponent, },
  { path: 'doc', component: DocComponent, },
  { path: 'data', component: DataComponent, },
  { path: 'alarm', component: BlankComponent, },
  { path: 'repair', component: BlankComponent, },
  { path: 'regulation', component: BlankComponent, },
  { path: 'forum', component: BlankComponent, },
  { path: 'rank', component: BlankComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    IndexComponent,
    DocComponent,
    DataComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class HomeModule { }
