import { Platform } from 'ionic-angular';
import { IBeacon, IBeaconPluginResult, BeaconRegion } from '@ionic-native/ibeacon';
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
    //Save the current scope in order to use it in delegate functions
    var scope = this;

    // Request permission to use location on iOS
    this.beacon.requestAlwaysAuthorization();
    console.debug("iOS permissions requested");

    // create a new delegate and register it with the native layer
    let delegate = this.beacon.Delegate();
    console.debug("delegate created");

    let beaconRegion = this.beacon.BeaconRegion('SomeBeacon', cordova.plugins.locationManager.BeaconRegion.WILDCARD_UUID);
    //let beaconRegion = this.beacon.BeaconRegion('deskBeacon', 'ACFD065E-C3C0-11E3-9BBE-1A514932AC01');
    console.debug("beaconRegion created");

    // Subscribe to some of the delegate's event handlers
    delegate.didStartMonitoringForRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => console.log('didStartMonitoringForRegion: ', pluginResult),
      (error: any) => console.error(`Failure during starting of monitoring: `, error)
    );
    console.debug("didStartMonitoringForRegion subscribed");

    delegate.didRangeBeaconsInRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        console.debug("iBeacon frame received from " + pluginResult.beacons.length + " beacons");

        this.beaconRepopulateList(scope, pluginResult);
      },
      (error: any) => console.error(`Failure during ranging: `, error)
    );
    console.debug("didRangeBeaconsInRegion subscribed");

    delegate.didEnterRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        console.log('A beacon entered the region: ', pluginResult);
      }
    );
    console.debug("didEnterRegion subscribed");

    delegate.didExitRegion().subscribe(
      (pluginResult: IBeaconPluginResult) => {
        console.log('A beacon left the region: ', pluginResult);
        this.beaconRepopulateList(scope, pluginResult);

      }
    );
    console.debug("didExitRegion subscribed");

    this.beaconStartListening(beaconRegion);
  }

  beaconStartListening(region: BeaconRegion) {
    this.beacon.startMonitoringForRegion(region).then(
      () => console.log('Native layer recieved the request to monitoring'),
      (error: any) => console.error('Native layer failed to begin monitoring: ', error)
    );

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
