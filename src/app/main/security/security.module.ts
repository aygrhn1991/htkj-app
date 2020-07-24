import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BindComponent } from './bind/bind.component';
import { AgreementComponent } from './agreement/agreement.component';

const routes: Routes = [
  { path: '', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'agreement', component: AgreementComponent },
  { path: 'bind/:from', component: BindComponent },
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AgreementComponent,
    BindComponent,
  ],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SecurityModule { }
