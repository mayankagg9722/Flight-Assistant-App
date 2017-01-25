import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { CabHistoryPage } from '../cab-history/cab-history';
/*
  Generated class for the Cab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cab',
  templateUrl: 'cab.html'
})

export class CabPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public modalCtrl: ModalController) { }

  openModal(data) {
    let modal = this.modalCtrl.create(CabHistoryPage,{data:data});
    modal.present();
  }

}
