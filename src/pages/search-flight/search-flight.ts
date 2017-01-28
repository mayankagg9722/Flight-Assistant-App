import { Component ,AfterViewInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FlightData} from '../../providers/flight-data';
import {FlightDetailsPage} from '../flight-details/flight-details';
import { ToastController } from 'ionic-angular';

declare var $:any;

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
export class SearchFlightPage implements AfterViewInit{

 myDate:String=new Date().toISOString();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private flightData:FlightData,private toastCtrl: ToastController) {
    
  }

  ngAfterViewInit() {
                $('.button-inner').click(function() {
                    setTimeout(function() {
                        $('#container').removeClass('beginning');
                        $('.curvable').addClass('curved');
                        setTimeout(function() {
                            $('#container').addClass('hover');
                            setTimeout(function() {
                                $('#container').addClass('fly_away_first');
                                setTimeout(function() {
                                    $('#container').addClass('fly_away');
                                    setTimeout(function(){
                                        // $('#plate').addClass('front');
                                        $('#container').removeClass('fly_away fly_away_first hover').addClass('beginning');
                                        $('.curvable').removeClass('curved');
                                    },3000);
                                }, 600);
                            }, 2000);
                        }, 2800);
                    }, 200);
                });
    }

  search(flightcode,flightnumber,myDate){
    var myDateDiv=myDate.substr(0,10).split('-');
    var mydate=myDateDiv[0]+"/"+myDateDiv[1]+"/"+myDateDiv[2];
    // console.log(mydate);
    this.flightData.searchFlight(flightcode,flightnumber,mydate).subscribe(res=>{
      console.log(res.body);
      if(res.body != null){
        if((res.body.error!=undefined) || res.body.flightStatuses.length==0 ){ 
        let toast = this.toastCtrl.create({
          message: "Incorrect flight code or number",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }else {
        this.navCtrl.push(FlightDetailsPage,{res:res.body});
      }
      }else{
        let toast = this.toastCtrl.create({
          message: "Fill Form Completely",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
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
