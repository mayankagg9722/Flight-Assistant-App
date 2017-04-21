import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {SearchFlightPage} from '../pages/search-flight/search-flight';
import {FlightDetailsPage} from '../pages/flight-details/flight-details';
import {FlightHistoryPage} from '../pages/flight-history/flight-history';
import {FlightHistoryDetailsPage} from '../pages/flight-history-details/flight-history-details';
import {CabPage} from '../pages/cab/cab';
import {CabHistoryPage} from '../pages/cab-history/cab-history';
import {LoginPage} from '../pages/login/login';
import {SignupPage} from '../pages/signup/signup';
import {ContactUsPage} from '../pages/contact-us/contact-us';

@NgModule({
  declarations: [
    MyApp,
    SearchFlightPage,
    FlightDetailsPage,
    FlightHistoryPage,
    FlightHistoryDetailsPage,
    CabPage,
    CabHistoryPage,
    LoginPage,
    SignupPage,
    ContactUsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchFlightPage,
    FlightDetailsPage,
    FlightHistoryPage,
    FlightHistoryDetailsPage,
    CabPage,
    CabHistoryPage,
    LoginPage,
    SignupPage,
    ContactUsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
