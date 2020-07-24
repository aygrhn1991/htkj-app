import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center/center.component';
import { SettingComponent } from './setting/setting.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UpdateLogComponent } from './update-log/update-log.component';

const routes: Routes = [
  { path: '', redirectTo: 'center' },
  { path: 'center', component: CenterComponent, },
  { path: 'setting', component: SettingComponent, },
  { path: 'update-log', component: UpdateLogComponent, },
];

@NgModule({
  declarations: [
    CenterComponent,
    SettingComponent,
    UpdateLogComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
