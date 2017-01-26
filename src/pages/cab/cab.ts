import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CabHistoryPage } from '../cab-history/cab-history';
import { CabData } from '../../providers/cab-data';
import { ToastController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
/*
  Generated class for the Cab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cab',
  templateUrl: 'cab.html',
  providers: [AuthData, CabData]
})

export class CabPage {

  posteddata:Object;
  requesteddata:Object;
  cabs:String;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, private cabData: CabData, private toastCtrl: ToastController, private auth: AuthData,public alertCtrl: AlertController) {
    this.getPosted();
    this.getRequested();
  }

  openModal(data) {
    let modal = this.modalCtrl.create(CabHistoryPage, { data: data });
    modal.present();
  }

  getPosted() {
    if (this.auth.isLoggedIn) {

      this.cabData.cabPosted().subscribe(res => {
        if (res.success == false) {
          let toast = this.toastCtrl.create({
            message: "Not posted any cab",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          // console.log(res);
          this.posteddata=res.data[0];
          this.cabs="posted";
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

  getRequested() {
    if (this.auth.isLoggedIn) {

      this.cabData.cabRequested().subscribe(res => {
        if (res.success == false) {
          let toast = this.toastCtrl.create({
            message: "Not requested any cab",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          // console.log(res);
          this.requesteddata=res.data;
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

  getcabinfo(){
        if (this.auth.isLoggedIn) {

      this.cabData.getCabInfo().subscribe(res => {
        if (res.success == false) {
          let toast = this.toastCtrl.create({
            message: "Check Internet Connection",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          console.log(res);
          this.showAlert(res.data);
          // this.requesteddata=res.data;
        }
      },
        err => {
          console.log(err);
          let toast = this.toastCtrl.create({
            message: "Check Internet Connection",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }),
        () => console.log('Completed')

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

   postcabinfo(){
        if (this.auth.isLoggedIn) {

      this.cabData.postCabInfo().subscribe(res => {
        if (res.success == false) {
          let toast = this.toastCtrl.create({
            message: "Check Internet Connection",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }
        else {
          console.log(res);
          this.showAlert(res.data);
          // this.requesteddata=res.data;
        }
      },
        err => {
          console.log(err);
          let toast = this.toastCtrl.create({
            message: "Check Internet Connection",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        }),
        () => console.log('Completed')

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

  showAlert(data) {
    let alert = this.alertCtrl.create({
      title: 'Found cab results',
      subTitle: data[0].username+"\nshow mobile number",
      buttons: ['OK']
    });
    alert.present();
  }




}