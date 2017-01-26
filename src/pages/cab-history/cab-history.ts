import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { CabData } from '../../providers/cab-data';
import { ToastController } from 'ionic-angular';
import { CabPage } from '../cab/cab';
import { LoginPage } from '../login/login';
import { AuthData } from '../../providers/auth-data';
declare let google: any;
/*
  Generated class for the CabHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cab-history',
  templateUrl: 'cab-history.html',
  providers: [AuthData, CabData]
})
export class CabHistoryPage {

  @ViewChild('currentlocation') currentlocation: ElementRef;
  @ViewChild('destination') destination: ElementRef;

  divShow: boolean = false;
  myDate: String = new Date().toISOString();
  timeStarts: String;
  currentLocation: string;
  destinationLocation: string;

  constructor(public navCtrl: NavController, public viewCtrl: ViewController, public navParams: NavParams, private cabData: CabData, private toastCtrl: ToastController, private auth: AuthData) {
    // console.log(this.navParams.get("data"));
    this.timeStarts=new Date().getHours() + ":" + new Date().getMinutes();
    if (this.navParams.get("data") == "postcab") {
      this.divShow = false;
    } else {
      this.divShow = true;
    }
  }


  ionViewDidLoad() {

    const options = {
      types: ['(cities)'],
      componentRestrictions: { country: "IN" }
    };

    const _this = this;
    const currentlocation = this.currentlocation["_elementRef"].nativeElement.firstElementChild;

    const autocompleteLoading = new google.maps.places.Autocomplete(currentlocation, options);

    autocompleteLoading.addListener('place_changed', function () {

      let place = autocompleteLoading.getPlace();
      // console.log(place);
      _this.currentLocation = place.formatted_address;
    });

    const destination = this.destination["_elementRef"].nativeElement.firstElementChild;

    const autocompleteDestination = new google.maps.places.Autocomplete(destination, options);

    autocompleteDestination.addListener('place_changed', function () {

      let place = autocompleteDestination.getPlace();
      // console.log(place);
      _this.destinationLocation = place.formatted_address;
    });

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  submit(myDate, timeStarts, car, num) {
    var myDateDiv = myDate.substr(0, 10).split('-');
    var mydate = myDateDiv[0] + "/" + myDateDiv[1] + "/" + myDateDiv[2];
    // console.log(mydate, timeStarts, car, num);
    // console.log(this.currentLocation);
    // console.log(this.destinationLocation);
    if (this.auth.isLoggedIn) {
      if (this.navParams.get("data") == "getcab") {
        this.cabData.getCab(myDate, timeStarts, this.currentLocation, this.destinationLocation, car, num).subscribe(res => {
          if (res.success == false) {
            let toast = this.toastCtrl.create({
              message: "Not able to request for cab",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
          else {
            let toast = this.toastCtrl.create({
              message: "Request Confirmed",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.navCtrl.push(CabPage);
          }
        },
          err => {
            console.log(err);
            let toast = this.toastCtrl.create({
              message: "Not able to request for cab",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }),
          () => console.log('Completed')
      } else {
        this.cabData.postCab(myDate, timeStarts, this.currentLocation, this.destinationLocation, car, num).subscribe(res => {
          // console.log("post",res);
          if (res.success == false) {
            let toast = this.toastCtrl.create({
              message: "Not able to post your cab",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
          else {
            let toast = this.toastCtrl.create({
              message: "Request Confirmed",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.navCtrl.push(CabPage);
          }
        },
          err => {
            console.log(err);
            let toast = this.toastCtrl.create({
              message: "Not able to post your cab",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }),
          () => console.log('Completed')
      }
    } else {
      let toast = this.toastCtrl.create({
        message: 'First login to request cabs',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      //push to login
      this.navCtrl.push(LoginPage);
    }

  }

}
