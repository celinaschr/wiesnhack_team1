import { CommentModel } from './../../interfaces/commentModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestApiProvider 
{
  testApi:string ="https://jsonplaceholder.typicode.com/comments?postId=1";
  restResult:Observable<any>;
  resultComments:CommentModel[] = [];

  constructor(public client: HttpClient) 
  {    

  }

  restCall()
  {
    this.restResult = this.client.get<CommentModel>(this.testApi, {responseType:'json'});
    this.restResult.subscribe(data => 
      {
        this.resultComments = data;
        console.debug('Received comments: ', this.resultComments.length);
        this.resultComments.forEach(element => {
          console.debug('Email :',element.email);
        });
      })  
  }
}