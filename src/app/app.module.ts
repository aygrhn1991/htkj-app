import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

const routes: Routes = [
  { path: '', loadChildren: () => import('./main/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'security', loadChildren: () => import('./main/security/security.module').then(m => m.SecurityModule) }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    // { provide: 'API_URL', useValue: 'http://www.chinavnu.com' },
    // { provide: 'API_URL', useValue: 'http://192.168.40.17:10034' },
    { provide: 'API_URL', useValue: 'http://113.0.51.228:57695' },
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
