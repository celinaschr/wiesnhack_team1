import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { BeaconScannerProvider } from './../../providers/beacon-scanner/beacon-scanner';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UniqueDeviceID} from '@ionic-native/unique-device-id';

@Component
({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userName:string;

  constructor(
    public navCtrl: NavController,
    public NavParams:NavParams,
    public beaconScanner:BeaconScannerProvider,
    public restApi:RestApiProvider,
    public uniqueDeviceID: UniqueDeviceID)
  {
    this.userName = "Superman";
  }

  //Init interval funtions on view load
  ionViewDidLoad(){
    //start scanning
    //this.beaconScanner.platformDetection();
    //console.debug("View did load Home.ts");
    //setInterval(()=>this.intervalFunction(),2000);
  }

  intervalFunction()
  {
    if(this.beaconScanner.beaconList.length > 0)
    {
      this.restApi.registerUserInRoom(this.userName,this.beaconScanner.beaconList[0].id);
    }
    else
    {
      this.restApi.deregisterUser(this.userName);
    }

    this.restApi.getAllUsersInRooms();
  }

  //Use provider to start sensing beacons
  //User is at the restroom and wants to get it
  btnStartScanning()
  {
    this.beaconScanner.platformDetection();
    console.debug("Started scanning for beacons");
  }

  btnRestPull()
  {
    this.restApi.getAllUsersInRooms();
    console.debug("Rest call executed");
  }

  btnRestPush()
  {
    if(this.beaconScanner.beaconList.length > 0)
    {
      this.restApi.registerUserInRoom(this.userName,this.beaconScanner.beaconList[0].id);
    }
    else
    {
      this.restApi.deregisterUser(this.userName);
    }
  }


  btnNeedtoPee()
  {
    //Add me to backend
  }

  btnHeretoPee()
  {
    this.beaconScanner.platformDetection();
    console.debug("No toilet close to you");
    if(this.beaconScanner.beaconList.length > 0){
      this.restApi.registerUserInRoom(this.userName, this.beaconScanner.beaconList[0].id);
    }else{
      this.restApi.deregisterUser(this.userName);
    }
  }
}
