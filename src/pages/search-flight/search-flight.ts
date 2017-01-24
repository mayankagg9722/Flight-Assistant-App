import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FlightData} from '../../providers/flight-data';
import {FlightDetailsPage} from '../flight-details/flight-details';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the SearchFlight page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-flight',
  templateUrl: 'search-flight.html',
  providers:[FlightData]
})
export class SearchFlightPage {

 myDate:String=new Date().toISOString();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private flightData:FlightData,private toastCtrl: ToastController) {
    
  }

  search(flightcode,flightnumber,myDate){
    var myDateDiv=myDate.substr(0,10).split('-');
    var mydate=myDateDiv[0]+"/"+myDateDiv[1]+"/"+myDateDiv[2];
    // console.log(mydate);
    this.flightData.searchFlight(flightcode,flightnumber,mydate).subscribe(res=>{
      console.log(res.body.flightStatuses.length);
      if((res.body.error!=undefined) || res.body.flightStatuses.length==0){ 
        let toast = this.toastCtrl.create({
          message: "Incorrect flight code or number",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else {
        this.navCtrl.push(FlightDetailsPage,{res:res.body});
      }
    },
      err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: "Not able to fetch",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }),
      () => console.log('Completed')
  }

}
