import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RestApiProvider 
{
  testApi:string ="https://jsonplaceholder.typicode.com/posts";
  restResult:Observable<any>;

  constructor(public client: HttpClient) 
  {    
    
  }

  restCall()
  {
    this.restResult = this.client.get(this.testApi);
    this.restResult.subscribe(data => {
      console.debug('Response data:',data);
    })  
  }

}
