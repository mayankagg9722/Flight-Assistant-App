import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import localStorage from 'localStorage';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the AuthData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class AuthData {

  private loggedIn: boolean = false;

  constructor(public http: Http) {
    console.log('Hello AuthData Provider');
  }


  login(username, password): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
   
    let data = JSON.stringify({
      "username": username,
      "password": password
    });

    console.log(data);

    return this.http.post(`http://localhost:3000/login`, data, { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.success == true) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }
        return res;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }


}



