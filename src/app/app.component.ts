import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
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

  rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Page One', component: Page1},
      {title: 'Page Two', component: Page2},
      {title: 'SearchFlight',component:SearchFlightPage},
      {title: 'FlightDetails',component:FlightDetailsPage},
      {title: 'FlightHistory',component:FlightHistoryPage},
      {title: 'FlightHistoryDetails',component:FlightHistoryDetailsPage},
      {title: 'CabPage',component:CabPage},
      {title: 'CabHistory',component:CabHistoryPage},
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
