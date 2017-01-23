import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthData} from '../../providers/auth-data';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[AuthData]
})
export class LoginPage {

  token:string[]
  username:string
  password:string

  constructor(public navCtrl: NavController, public navParams: NavParams ,private auth:AuthData,private toastCtrl:ToastController ) {}

 login(username, password) {
    this.auth.login(username, password).subscribe(res => {
      console.log(res);
      this.token = res;
      if (res.success == true) {
        let toast = this.toastCtrl.create({
          message: 'Login successfully',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    },
    err=>{
      console.log(err);
       let toast = this.toastCtrl.create({
          message: "Not a valid username or password",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }),
    () => console.log('Completed')
 }

}
