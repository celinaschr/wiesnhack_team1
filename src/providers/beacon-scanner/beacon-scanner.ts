import { Platform } from 'ionic-angular';
import { IBeacon, IBeaconPluginResult, BeaconRegion, IBeaconDelegate } from '@ionic-native/ibeacon';
import { Injectable, NgZone } from '@angular/core';
import { Beacon } from './../../interfaces/beaconModel';

//enable cordova platform in this context (used to access wildcard UUID)
declare var cordova: any;

@Injectable()
export class BeaconScannerProvider {

  platformName: string = "Not initialized";
  beaconList: Beacon[] = [];

  constructor(
    private beacon: IBeacon,
    public platform: Platform,
    public zone: NgZone) {
    this.enableDebugLogs();
  }

  public enableDebugLogs(): void {
    this.platform.ready().then(async () => {
      this.beacon.enableDebugLogs();
      this.beacon.enableDebugNotifications();
    });
  }

  platformDetection() {
    if (this.platform.is('android')) {
      this.platformName = "Mobile: Location Manager available";
      console.debug("Mobile platform detected");
      this.iBeaconScanner();
    }
    else {
      this.platformName = "Dev.Env.: Location Manager not available";
      console.debug("Development environment detected. Location Manager not available");
    }
  }

  iBeaconScanner() {
    // Request permission to use location on iOS
    this.beacon.requestAlwaysAuthorization();
    console.debug("iOS permissions requested");

    // create a new delegate and register it with the native layer
    let delegate = this.beacon.Delegate();
    console.debug("Beacon delegate created");

    let region = this.beacon.BeaconRegion('SomeBeacon', cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID);
    console.debug("Beacon region created with wildcard id");
    //let region = this.beacon.BeaconRegion('deskBeacon', 'ACFD065E-C3C0-11E3-9BBE-1A514932AC01');

    // Subscribe to some of the delegate's event handlers
    this.registerEventEnterRegion(delegate);
    this.registerEventExitRegion(delegate);
    this.registerEventsRangeBeaconInRegion(delegate);

    //Start
    this.startMonitoringForRegion(region);
    this.startMonitoringBeacons(region);
  }

  registerEventStartMonitoringForRegion(del:IBeaconDelegate)
  {
    del.didStartMonitoringForRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => console.log('didStartMonitoringForRegion: ', pluginResult),
      (error: any) => console.error(`Failure during starting of monitoring: `, error)
    );
    console.debug("didStartMonitoringForRegion subscribed");
  }

  registerEventsRangeBeaconInRegion(del:IBeaconDelegate)
  {
    del.didRangeBeaconsInRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        for(let i=0; i < pluginResult.beacons.length; i++)
        {
          //Register Case
          if(pluginResult.beacons[i].rssi >= -85)
          {
            console.debug("Beacon " + pluginResult.beacons[i].uuid + " in close range");
            this.beaconRepopulateList(this, pluginResult);
          }
          else
          {
            this.cleanBeaconList();
          }
        }
      },
      (error: any) => console.error(`Failure during ranging: `, error)
    );
    console.debug("didRangeBeaconsInRegion subscribed");
  }

  registerEventEnterRegion(del:IBeaconDelegate)
  {
    del.didEnterRegion().subscribe(
      (pluginResult: IBeaconPluginResult) =>
      {
        if(pluginResult.region.identifier)
          console.debug("ENTERED region " + pluginResult.region.identifier);
      }
    );
    console.debug("didEnterRegion subscribed");
  }

  registerEventExitRegion(del:IBeaconDelegate)
  {
    del.didExitRegion().subscribe(
      (pluginResult: IBeaconPluginResult) =>
      {
        if(pluginResult.region.identifier)
        console.debug("LEFT region " + pluginResult.region.identifier);
      }
    );
    console.debug("didExitRegion subscribed");
  }

  startMonitoringForRegion(region: BeaconRegion)
  {
    this.beacon.startMonitoringForRegion(region).then(
      () =>
      {
        console.log('Native layer recieved the request to monitoring')
      },
      (error: any) =>
      {
        console.error('Native layer failed to begin monitoring: ', error)
      }
    );
  }

  startMonitoringBeacons(region: BeaconRegion)
  {
    this.beacon.startRangingBeaconsInRegion(region)
      .then(() => {
        console.log(`Started ranging beacon region: `, region);
      })
      .catch((error: any) => {
        console.error(`Failed to start ranging beacon region: `, region);
      });
  }

  beaconRepopulateList(scope: BeaconScannerProvider, pluginResult: IBeaconPluginResult) {
    scope.cleanBeaconList();

    //Add beacons to list
    pluginResult.beacons.forEach(beacon => {
      scope.addBeacon(beacon.uuid, beacon.rssi.toString());
    });
  }

  addBeacon(uuid: string, signal: string) {
    this.zone.run(() => { this.beaconList.push({ id: uuid, signal: signal }); });
  }

  cleanBeaconList() {
    while (this.beaconList.length > 0) {
      this.beaconList.pop();
    }
  }
}
