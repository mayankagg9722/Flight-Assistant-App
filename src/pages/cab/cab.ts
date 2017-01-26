import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CabHistoryPage } from '../cab-history/cab-history';
import { CabData } from '../../providers/cab-data';
import { ToastController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LoginPage } from '../login/login';
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
    public modalCtrl: ModalController, private cabData: CabData, private toastCtrl: ToastController, private auth: AuthData) {
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

}