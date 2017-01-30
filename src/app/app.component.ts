import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {SearchFlightPage} from '../pages/search-flight/search-flight';
import {FlightDetailsPage} from '../pages/flight-details/flight-details';
import {FlightHistoryPage} from '../pages/flight-history/flight-history';
import {FlightHistoryDetailsPage} from '../pages/flight-history-details/flight-history-details';
import {CabPage} from '../pages/cab/cab';
import {CabHistoryPage} from '../pages/cab-history/cab-history';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'SearchFlight',component:SearchFlightPage},
      {title: 'FlightHistory',component:FlightHistoryPage},
      {title: 'CabPage',component:CabPage},
      {title: 'Login',component:LoginPage},
      {title: 'Signup',component:SignupPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
