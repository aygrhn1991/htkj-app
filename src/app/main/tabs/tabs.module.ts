import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule), canActivate: [GuardService] },
      { path: 'control', loadChildren: () => import('../control/control.module').then(m => m.ControlModule), canActivate: [GuardService] },
      { path: 'map', loadChildren: () => import('../map/map.module').then(m => m.MapModule), canActivate: [GuardService] },
      { path: 'user', loadChildren: () => import('../user/user.module').then(m => m.UserModule), canActivate: [GuardService] },
      { path: 'list', loadChildren: () => import('../list/list.module').then(m => m.ListModule), canActivate: [GuardService] },
    ]
  },
];

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
