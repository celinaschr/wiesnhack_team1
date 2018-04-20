import { BeaconScannerProvider } from './../../providers/beacon-scanner/beacon-scanner';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//@IonicPage()
@Component
(
  {
    selector: 'page-home',
    templateUrl: 'home.html'  
  }
)

export class HomePage 
{
  constructor(
    public navCtrl: NavController,
    public NavParams:NavParams,
    public beaconScanner:BeaconScannerProvider) 
  {  
  }

  //Use provider to start sensing beacons
  btnStartScanning()
  {
    this.beaconScanner.platformDetection();
    console.debug("Started scanning for beacons");
  }

}
