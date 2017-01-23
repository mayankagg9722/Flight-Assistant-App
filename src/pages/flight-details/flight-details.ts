import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the FlightDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flight-details',
  templateUrl: 'flight-details.html'
})
export class FlightDetailsPage {

  data: string;
  arrivalDate:string;
  departureDate:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get("res"));
    this.data = navParams.get("res");
    this.arrivalDate=navParams.get("res").flightStatuses[0].departureDate.dateLocal.substr(0,10);
    this.departureDate=navParams.get("res").flightStatuses[0].arrivalDate.dateLocal.substr(0,10);
  }

}
