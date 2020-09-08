import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenterComponent } from './center/center.component';
import { SettingComponent } from './setting/setting.component';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UpdateLogComponent } from './update-log/update-log.component';
import { BlankComponent } from 'src/app/modules/blank/blank.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
  { path: '', redirectTo: 'center' },
  { path: 'center', component: CenterComponent, },
  { path: 'setting', component: BlankComponent, },
  { path: 'message', component: MessageComponent, },
  { path: 'dtu-update-log', component: BlankComponent, },
  { path: 'info', component: BlankComponent, },
  { path: 'security', component: BlankComponent, },
  { path: 'update-log', component: UpdateLogComponent, },
];

@NgModule({
  declarations: [
    BlankComponent,
    CenterComponent,
    SettingComponent,
    UpdateLogComponent,
    MessageComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
