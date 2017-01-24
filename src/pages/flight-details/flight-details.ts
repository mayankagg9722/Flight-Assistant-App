import { Component ,OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { FlightData } from '../../providers/flight-data';
import { LoginPage } from '../login/login';
import { ToastController } from 'ionic-angular';
import {FlightHistoryPage} from '../flight-history/flight-history';
declare var google: any;
/*
  Generated class for the FlightDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-flight-details',
  templateUrl: 'flight-details.html',
  providers: [AuthData, FlightData]
})
export class FlightDetailsPage implements OnInit{

  arrivalDate: string;
  departureDate: string;
  flightName: string;
  departue: string;
  arrival: string;
  duration: string;
  arrivalTerminal: string;
  departureTerminal: string;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthData, private flightData: FlightData, public toastCtrl: ToastController) {
    // console.log(navParams.get("res"));
    let ob = navParams.get("res");
    this.departureDate = ob.flightStatuses[0].departureDate.dateLocal.substr(0, 10);
    this.arrivalDate = ob.flightStatuses[0].arrivalDate.dateLocal.substr(0, 10);
    this.flightName = ob.appendix.airlines[0].name;
    this.departue = ob.flightStatuses[0].departureAirportFsCode;
    this.arrival = ob.flightStatuses[0].arrivalAirportFsCode;
    this.duration = ob.flightStatuses[0].flightDurations.scheduledBlockMinutes;
    this.arrivalTerminal = ob.flightStatuses[0].airportResources.arrivalTerminal;
    this.departureTerminal = ob.flightStatuses[0].airportResources.departureTerminal;
  }

     ngOnInit() {
      var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: 13.0827, lng: 80.2707}
        });
        directionsDisplay.setMap(map);
        directionsService.route({
          origin: this.departue+" Airport",
          destination: this.arrival+" Airport" ,
          travelMode: 'DRIVING'
        }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            // window.alert('Directions request failed due to ' + status);
          }
        });
      }

  add() {
    if (this.auth.isLoggedIn) {
      // console.log(this.navParams.get("res"));
      this.flightData.addFlight(this.navParams.get("res")).subscribe(res => {
        console.log(res);
        if (res.success == false) {
          let toast = this.toastCtrl.create({
            message: "Not able to add your flight.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          let toast = this.toastCtrl.create({
            message: "Your flight added successfully",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          //push to history
          this.navCtrl.push(FlightHistoryPage);
        }
      },
        err => {
          console.log(err);
          let toast = this.toastCtrl.create({
            message: "Not able to add your flight.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }),
        () => console.log('Completed')
    }
    else {
      let toast = this.toastCtrl.create({
        message: 'First login to add your flights',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      //push to login
      this.navCtrl.push(LoginPage);
    }
  }

}
