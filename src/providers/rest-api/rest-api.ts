import { Comment } from './../../interfaces/commentModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestApiProvider
{
  urlGetAllUsersInRooms:string = "http://peoplecontrollerapi.azurewebsites.net/api/Position";
  urlRegisterUserInRoom:string = "http://peoplecontrollerapi.azurewebsites.net/api/Position?userId=Melanie Bertsch&beaconId=ACFD065E-C3C0-11E3-9BBE-1A514932AC02";
  urlDeregisterUser:string = "http://peoplecontrollerapi.azurewebsites.net/api/Position?userId=Melanie Bertsch";
  
  testApi:string ="https://jsonplaceholder.typicode.com/comments?postId=1";
  restResult:Observable<any>;
  resultComments:Comment[] = [];

  constructor(public client: HttpClient){}

  restCall()
  {
    this.restResult = this.client.get<Comment>(this.testApi, {responseType:'json'});
    this.restResult.subscribe(data =>
      {
        this.resultComments = data;
        console.debug('Received comments: ', this.resultComments.length);
        this.resultComments.forEach(element => {
          console.debug('Email :',element.email);
        });
      })
  }

  getAllUsersInRooms()
  {}

  registerUserInRoom(userId:string,beaconId:string)
  {

  }

  deregisterUser(userId:string)
  {


  }

}