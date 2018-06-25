import { User } from './../../interfaces/userModel';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestApiProvider
{
  urlGetAllUsersInRooms:string = "http://peoplecontrollerapi.azurewebsites.net/api/Position";
  urlRegisterUserInRoom:string = "http://peoplecontrollerapi.azurewebsites.net/api/Position?userId=Peep&beaconId=ACFD065E-C3C0-11E3-9BBE-1A514932AC02";
  urlDeregisterUser:string = "http://peoplecontrollerapi.azurewebsites.net/api/Position?userId=Peep";

  restResult:Observable<any>;
  resultUsers:User[] = [];

  constructor(public client: HttpClient){}

  getAllUsersInRooms()
  {
    this.restResult = this.client.get<User>(this.urlGetAllUsersInRooms, {responseType:'json'});
    this.restResult.subscribe(data =>
      {
        this.resultUsers = data;
        console.debug("Received " + this.resultUsers.length + " users");
        // this.resultUsers.forEach(element => {
        //   console.debug("User Name : "+element.userId);
        // });
      })
  }

  registerUserInRoom(userId:string,beaconId:string)
  {

    console.debug("Trying to register user "+userId+" on beacon " + beaconId);

    let headers = new HttpHeaders();
    headers = headers.set("Content-Type", "application/x-www-form-urlencoded");

    let httpParams = new HttpParams()
    .append("userId", userId)
    .append("beaconId", beaconId);

    let url  = "http://peoplecontrollerapi.azurewebsites.net/api/Position";

    this.client.post(url,"null",{headers:headers,params:httpParams}).subscribe(data =>
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

    let url  = "http://peoplecontrollerapi.azurewebsites.net/api/Position";
    this.client.delete(url,{headers:headers,params:httpParams}).subscribe(data =>
      {
        console.debug("Delete sent");
      });
  }

}