import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the SearchFlight page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-flight',
  templateUrl: 'search-flight.html'
})
export class SearchFlightPage {

 myDate:String=new Date().toISOString();
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFlightPage');
  }

}
