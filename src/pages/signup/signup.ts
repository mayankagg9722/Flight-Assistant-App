import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {SearchFlightPage} from '../search-flight/search-flight'
/*
  Generated class for the Signup page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [AuthData]
})
export class SignupPage implements AfterViewInit {

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthData, private toastCtrl: ToastController, public alertCtrl: AlertController) { }

ngAfterViewInit() {
  $(document).ready(function(e){
   $('h6').on('click',function(){
      $('.social').stop().slideToggle();
   });
})
}

  signup(email, password, username, fname, lname, number) {
    this.auth.signup(email, password, username, fname, lname, number).subscribe(res => {
      console.log(res);
      if (res.success == true) {
        let toast = this.toastCtrl.create({
          message: 'Registration successfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.getOtp(username);
      }else{
        let toast = this.toastCtrl.create({
          message: 'Registration unsuccessfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    },
      err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: "Registeration failed",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }),
      () => console.log('Completed')
  }

  getOtp(username) {
    this.auth.getotp(username).subscribe(res => {
      console.log(res);
      if (res.status == true) {
         let toast = this.toastCtrl.create({
          message: "OTP send successfully",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.showprompt(username);
      }
    },
    err=>{
      console.log(err);
        let toast = this.toastCtrl.create({
          message: "OTP failed",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
    }),
    ()=>console.log('Completed')
  }

  showprompt(username) {
    let prompt = this.alertCtrl.create({
      title: 'OTP',
      message: "Enter OTP recieved on your mobile.",
      inputs: [
        {
          name: 'otp',
          placeholder: 'OTP'
        },
      ],
      buttons: [
        {
          text: 'Resend OTP',
          handler: data => {
           this.getOtp(username);
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log("data-otp",data.otp);
            this.postotp(username,data.otp);
          }
        }
      ]
    });
    prompt.present();
  }

  postotp(username,otp){
     this.auth.postotp(username,otp).subscribe(res => {
       console.log(res);
      if (res.status == false) {
        let toast = this.toastCtrl.create({
          message: "Wrong OTP",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.showprompt(username);
      }
      else if (res.status == false) {
        let toast = this.toastCtrl.create({
          message: "OTP success",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        //push to another page
        this.navCtrl.push(SearchFlightPage);
      }
    },
    err=>{
      console.log(err);
        let toast = this.toastCtrl.create({
          message: "OTP failed",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
    }),
    ()=>console.log('Completed')
  }

}







