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
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
  providers: [AuthData]
})
export class ContactUsPage implements AfterViewInit{

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthData, private toastCtrl: ToastController, public alertCtrl: AlertController) { }

ngAfterViewInit()   {

}

}







