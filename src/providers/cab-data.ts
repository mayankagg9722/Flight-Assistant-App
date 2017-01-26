import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import localStorage from 'localStorage';
import 'rxjs/add/operator/map';


/*
  Generated class for the CabData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CabData {

  constructor(public http: Http) {
    console.log('Hello CabData Provider');
  }

  getCab(date,time,current_location,destination,car,number_of_person):Observable<any>{
    
    //only after authentication
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

    let data = JSON.stringify({		
      "date": date,     //"2017-01-22",
      "time": time,  //"16:00",
      "current_location": current_location, //"delhi",
      "destination": destination, //"cannaught place",
      "car": car,  //"swift desire",
      "number_of_person": number_of_person  //"6"
      });

    console.log(data);

    //only after authentication

    return this.http.post(`http://localhost:3000/cab/getcab`, data, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

    postCab(date,time,current_location,destination,car,car_seats):Observable<any>{
    
    //only after authentication
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

    let data = JSON.stringify({		
      "date": date,     //"2017-01-22",
      "time": time,  //"16:00",
      "current_location": current_location, //"delhi",
      "destination": destination, //"cannaught place",
      "car": car,  //"swift desire",
      "car_seats": car_seats  //"6"
      });

    console.log(data);

    //only after authentication

    return this.http.post(`http://localhost:3000/cab/postcab`, data, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  cabPosted():Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

    //only after authentication

    return this.http.get(`http://localhost:3000/cab/cabposted`, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  cabRequested():Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

    //only after authentication

    return this.http.get(`http://localhost:3000/cab/cabrequested`, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  postCabInfo():Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

    //only after authentication

    return this.http.get(`http://localhost:3000/cab/postcabinfo`, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getCabInfo():Observable<any>{
    let headers = new Headers();
    let token=localStorage.getItem('auth-token');
    headers.append('Content-Type', 'application/json');
    headers.append('auth-token',token);

    //only after authentication

    return this.http.get(`http://localhost:3000/cab/getcabinfo`, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

}
