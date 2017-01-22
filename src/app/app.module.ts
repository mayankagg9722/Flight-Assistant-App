import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
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

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    SearchFlightPage,
    FlightDetailsPage,
    FlightHistoryPage,
    FlightHistoryDetailsPage,
    CabPage,
    CabHistoryPage,
    LoginPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    SearchFlightPage,
    FlightDetailsPage,
    FlightHistoryPage,
    FlightHistoryDetailsPage,
    CabPage,
    CabHistoryPage,
    LoginPage,
    SignupPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
