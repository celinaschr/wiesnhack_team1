import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//iBeacon import
import { IBeacon } from '@ionic-native/ibeacon';
//rest support
import { HttpClientModule } from '@angular/common/http';

//custom providers
import { BeaconScannerProvider } from '../providers/beacon-scanner/beacon-scanner';
import { RestApiProvider } from './../providers/rest-api/rest-api';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IBeacon,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BeaconScannerProvider,
    RestApiProvider
  ]
})
export class AppModule {}
