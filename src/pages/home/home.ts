//import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { BeaconScannerProvider } from './../../providers/beacon-scanner/beacon-scanner';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component
({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public NavParams:NavParams,
    public beaconScanner:BeaconScannerProvider,
    //public restApi:RestApiProvider) 
  )
  {  
  }

  //Use provider to start sensing beacons
  btnStartScanning()
  {
    this.beaconScanner.platformDetection();
    console.debug("Started scanning for beacons");
  }

  btnRestCall()
  {
    //this.restApi.restCall();
    console.debug("Rest call executed");
  }
}
