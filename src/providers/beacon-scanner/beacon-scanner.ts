import { Platform } from 'ionic-angular';
import { IBeacon, IBeaconPluginResult, BeaconRegion } from '@ionic-native/ibeacon';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

//enable cordova platform in this context
declare var cordova: any;

//Beacon model
type UIBeacon =
{
  id:string;
  signal:string;
}

@Injectable()
export class BeaconScannerProvider 
{
  platformName:string = "Not initialized";
  beaconList:UIBeacon[] = [];

  constructor(
    public zone:NgZone, 
    public platform:Platform) 
  {
    this.zone = new NgZone({ enableLongStackTrace: false });
    console.log('new NgZone created');
  }

  platformDetection()
  {
    if(this.platform.is('android'))
    {
      this.platformName = "Mobile: Location Manager available";
      console.debug("Mobile platform detected");
      this.iBeaconScanner();
    }
    else
    {
      this.platformName = "Dev.Env.: Location Manager not available";
      console.debug("Development environment detected. Location Manager not available");
    }
  }

  addBeacon(uuid:string,signal:string)
  {
    this.zone.run(()=>{this.beaconList.push({id:uuid,signal:signal});});
  }
  
  cleanBeaconList()
  {
    while(this.beaconList.length > 0)
    {
      var b = this.beaconList.pop();
    }
  }

  iBeaconScanner()
  {
    //Save the current scope in order to use it in delegate functions
    var scope = this;
   
    var delegate = new cordova.plugins.locationManager.Delegate();
    console.debug("Beacon delegate created");

    //Wildcard UUID is used to detect all beacons in range
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion
    (
      "iBeacons",
      //"ACFD065E-C3C0-11E3-9BBE-1A514932AC01",
      cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID
    );
    console.debug("Beacon region created");
   
    //Fired each time a beacon frame has been received
    delegate.didRangeBeaconsInRegion = function (pluginResult:IBeaconPluginResult) 
    {
      //console.debug('Ranged beacons in region: ' + JSON.stringify(pluginResult));
      console.debug("iBeacon frame received from "+  pluginResult.beacons.length + " beacons");
      
      scope.cleanBeaconList();

      //Add beacons to list
      pluginResult.beacons.forEach(beacon => 
      {
        scope.addBeacon(beacon.uuid, beacon.rssi.toString());
      });
    };

    cordova.plugins.locationManager.setDelegate(delegate);
    console.debug("location manager delegate set");
    
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
      .fail(function(e) { console.debug(e); })
      .done();
    console.debug("started ranging beacons in range");
  }
}