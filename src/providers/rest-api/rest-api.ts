import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { User } from './../../interfaces/userModel';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { unescapeIdentifier } from '@angular/compiler';

@Injectable()
export class RestApiProvider
{
  serviceUrl = "https://peeplaningapp.azurewebsites.net/api/values/";

  restResult:Observable<any>;
  resultUsers:User[] = [];


  constructor(public client: HttpClient){}

  getPosition(){
    //warteschlangenposition 
    //muss über Backend kommen
    var position;
    position = this.client.get<User>(this.serviceUrl, {responseType:'json'});
    return position;

  }

  sendPeeSignal(){
    //Signal für pipi an backend
  }

  getAllUsersInRooms()
  {
    this.restResult = this.client.get<User>(this.serviceUrl, {responseType:'json'});
    this.restResult.subscribe(data =>
      {
        this.resultUsers = data;
        console.debug("Received " + this.resultUsers.length + " users");
        // this.resultUsers.forEach(element => {
        //   console.debug("User Name : "+element.userId);
        // });
      })
  }

  //Tells us if the user is close to the bathroom
  registerUserInRoom(userId:string,beaconId:string)
  {

    console.debug("Trying to register user "+userId+" on beacon " + beaconId);

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

    let httpParams = new HttpParams()
    .append("userId", userId)
    .append("beaconId", beaconId);

    this.client.post(this.serviceUrl,"null",{headers:headers,params:httpParams}).subscribe(data =>
      {
        console.debug("Post sent");
      });
  }
  //Once the person is no longer reachable 
  deregisterUser(userId:string)
  {
    console.debug("Trying to deregister user "+userId);

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

    let httpParams = new HttpParams()
    .append("userId", userId);

    this.client.delete(this.serviceUrl,{headers:headers,params:httpParams}).subscribe(data =>
      {
        console.debug("Delete sent");
      });
  }

  alineInQueue(userId:string)
  {
    this.client.get(this.serviceUrl + userId, {responseType:'json'});
  }

}