import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';


/*
  Generated class for the FlightData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FlightData {

  constructor(public http: Http) {
    console.log('Hello FlightData Provider');
  }

  searchFlight(flightcode, flightnumber,mydate) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = JSON.stringify({
      "flight_code": flightcode,
      "flight_number": flightnumber,
      "date": mydate
    });

    console.log(data);

    return this.http.post(`http://localhost:3000/details/flight`, data, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

}
