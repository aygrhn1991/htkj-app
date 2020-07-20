import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent, }
];

@NgModule({
  declarations: [],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecurityModule { }
