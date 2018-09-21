import { User } from './../../interfaces/userModel';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestApiProvider
{
  serviceUrl = "https://peoplecontrollerapicore.azurewebsites.net/api/Position";

  restResult:Observable<any>;
  resultUsers:User[] = [];


  constructor(public client: HttpClient){}

  getPosition(){
    //warteschlangenposition 
    //muss über Backend kommen
    var position;
    position = 5;
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

}