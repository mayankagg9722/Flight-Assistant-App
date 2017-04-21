import { Component ,OnInit} from '@angular/core';
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
export class SearchFlightPage implements OnInit{

 myDate:String = new Date().toISOString();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private flightData:FlightData,private toastCtrl: ToastController) {
      
  }

  ngOnInit()  {
      var $div = document.getElementById("gradient");
          // rgb vals of the gradients
          var gradients = [
            { start: [128,179,171], stop: [30,41,58] },
            { start: [255,207,160], stop: [234,92,68] },
            { start: [212,121,121], stop: [130,105,151] }
          ];
          // how long for each transition
          var transition_time = 4;

          // internal type vars
          var currentIndex = 0; // where we are in the gradients array
          var nextIndex = 1; // what index of the gradients array is next
          var steps_count = 0; // steps counter
          var steps_total = Math.round(transition_time*60); // total amount of steps
          var rgb_steps = {
            start: [0,0,0],
            stop: [0,0,0]
          }; // how much to alter each rgb value
          var rgb_values = {
            start: [0,0,0],
            stop: [0,0,0]
          }; // the current rgb values, gets altered by rgb steps on each interval
          var prefixes = ["-webkit-","-moz-","-o-","-ms-",""]; // for looping through adding styles
          var div_style = $div.style; // short cut to actually adding styles
          var color1, color2;

          // sets next current and next index of gradients array
          function set_next(num) {
            return (num + 1 < gradients.length) ? num + 1 : 0;
          }

          // work out how big each rgb step is
          function calc_step_size(a,b) {
            return (a - b) / steps_total;
          }

          // populate the rgb_values and rgb_steps objects
          function calc_steps() {
            for (var key in rgb_values) {
              if (rgb_values.hasOwnProperty(key)) {
                for(var i = 0; i < 3; i++) {
                  rgb_values[key][i] = gradients[currentIndex][key][i];
                  rgb_steps[key][i] = calc_step_size(gradients[nextIndex][key][i],rgb_values[key][i]);
                }
              }
            }
          }

          // update current rgb vals, update DOM element with new CSS background
          function updateGradient(){
            // update the current rgb vals
            for (var key in rgb_values) {
              if (rgb_values.hasOwnProperty(key)) {
                for(var i = 0; i < 3; i++) {
                  rgb_values[key][i] += rgb_steps[key][i];
                }
              }
            }

            // generate CSS rgb values
            var t_color1 = "rgb("+(rgb_values.start[0] | 0)+","+(rgb_values.start[1] | 0)+","+(rgb_values.start[2] | 0)+")";
            var t_color2 = "rgb("+(rgb_values.stop[0] | 0)+","+(rgb_values.stop[1] | 0)+","+(rgb_values.stop[2] | 0)+")";

            // has anything changed on this interation
            if (t_color1 != color1 || t_color2 != color2) {

              // update cols strings
              color1 = t_color1;
              color2 = t_color2;

              // update DOM element style attribute
              div_style.backgroundImage = "-webkit-gradient(linear, left bottom, right top, from("+color1+"), to("+color2+"))";
              for (var i = 0; i < 4; i++) {
                div_style.backgroundImage = prefixes[i]+"linear-gradient(45deg, "+color1+", "+color2+")";
              }
            }

            // we did another step
            steps_count++;
            // did we do too many steps?
            if (steps_count > steps_total) {
              // reset steps count
              steps_count = 0;
              // set new indexs
              currentIndex = set_next(currentIndex);
              nextIndex = set_next(nextIndex);
              // calc steps
              calc_steps();
            }

            if (div_style.backgroundImage.indexOf("gradient") != -1) {
              window.requestAnimationFrame(updateGradient)
            }
          }

          // initial step calc
          calc_steps();

          // go go go!
          window.requestAnimationFrame(updateGradient);
  }


  search(flightcode,flightnumber,myDate){
    var myDateDiv = myDate.substr(0,10).split('-');
    var mydate = myDateDiv[0] + "/" + myDateDiv[1] + "/" + myDateDiv[2];
    // console.log(mydate);
    this.flightData.searchFlight(flightcode,flightnumber,mydate).subscribe(res => {
      console.log(res.body);
      if(res.body != null){
        if((res.body.error != undefined) || res.body.flightStatuses.length == 0 ){ 
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
          message: "Incorrect flight code or number",
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
