import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FlightData } from '../../providers/flight-data';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import {FlightHistoryDetailsPage} from '../flight-history-details/flight-history-details'
/*
  Generated class for the FlightHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flight-history',
  templateUrl: 'flight-history.html',
  providers: [AuthData, FlightData]
})

export class FlightHistoryPage  {

  divShow: boolean = false;
  arrivalDate: string;
  departureDate: string;
  flightName: string;
  departue: string;
  arrival: string;
  duration: string;
  arrivalTerminal: string;
  departureTerminal: string;
  dep_weather:string;
  ari_weather:string;
  dep_weather_condition:string;
  ari_weather_condition:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthData, private flightData: FlightData, public toastCtrl: ToastController) {
    this.flightHistory();
  }

  flightHistory() {
    if (this.auth.isLoggedIn) {
      // console.log(this.navParams.get("res"));
      this.flightData.flightHistory().subscribe(res => {
        // console.log(res);
        if (res.status == false) {
          let toast = this.toastCtrl.create({
            message: "No flights added!",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.divShow = false;
        }
        else {
          // console.log(res);
          let ob = res.data.flight.flight;
          this.departureDate = ob.flightStatuses[0].departureDate.dateLocal.substr(0, 10);
          this.arrivalDate = ob.flightStatuses[0].arrivalDate.dateLocal.substr(0, 10);
          this.flightName = ob.appendix.airlines[0].name;
          this.departue = ob.flightStatuses[0].departureAirportFsCode;
          this.arrival = ob.flightStatuses[0].arrivalAirportFsCode;
          this.duration = ob.flightStatuses[0].flightDurations.scheduledBlockMinutes;
          this.arrivalTerminal = ob.flightStatuses[0].airportResources.arrivalTerminal;
          this.departureTerminal = ob.flightStatuses[0].airportResources.departureTerminal;
          this.getDepWeather(ob.flightStatuses[0].departureAirportFsCode);
          this.getAriWeather(ob.flightStatuses[0].arrivalAirportFsCode);
          this.divShow = true;
        }
      },
        err => {
          console.log(err);
          let toast = this.toastCtrl.create({
            message: "Try again after some time.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }),
        () => console.log('Completed')
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please login to see your flight history!',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      //push to login
      this.navCtrl.push(LoginPage);
    }

  }

  getDepWeather(code) {
    this.flightData.weather(code).subscribe(res => {
      // console.log(res.weather);
      this.dep_weather=String(parseInt(res.weather.temperatureCelsius)) + "°C";
      this.dep_weather_condition=res.weather.conditions.skyConditions[0].coverage;
    },
      err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: "Not able to fetch the weather",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }),
      () => console.log('Completed');
  }

    getAriWeather(code) {
    this.flightData.weather(code).subscribe(res => {
      this.ari_weather=String(parseInt(res.weather.temperatureCelsius)) + "°C";
      this.ari_weather_condition=res.weather.conditions.skyConditions[0].coverage;
    },
      err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: "Not able to fetch weather",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }),
      () => console.log('Completed');
  }

  nearby(){
    this.navCtrl.push(FlightHistoryDetailsPage,{airport:this.arrival});
  }

  share(){
    console.log("share info");
    //share info to any whatsapp contact
  }

}