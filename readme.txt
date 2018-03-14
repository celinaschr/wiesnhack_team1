//Ionic how to use iBeacon
{
    - Create new blank ionic Project
        ionic start iBeacon blank    
    - cd into it 
     - add mobile platforms 
        ionic cordova platform add android
    - install plugin: 
        ionic cordova plugin add cordova-plugin-ibeacon
        npm install --save @ionic-native/ibeacon
}

//Known bugs and issues
{
    - Current iBeacon plugin version not working with Android 8 (Oreo)
    - iBeacon Wrapper not working with Android 8 + 7
    - View not updating when not using zones and iBeacon delegate functions
    - When connected to an other active / running Bluetooth device
        (e.g. listen musik withe BT headphones) beacons won't show up
}