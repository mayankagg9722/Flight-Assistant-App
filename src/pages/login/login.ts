import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthData} from '../../providers/auth-data';
import { ToastController } from 'ionic-angular';
import {SearchFlightPage} from '../search-flight/search-flight';
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
export class LoginPage implements AfterViewInit{

  token:string[]
  username:string
  password:string
  isLogin:boolean

  constructor(public navCtrl: NavController, public navParams: NavParams ,private auth:AuthData,private toastCtrl:ToastController ) {
  }

ngAfterViewInit() {
  $(document).ready(function(e){
   $('h6').on('click',function(){
      $('.social').stop().slideToggle();
   });
})
}

 login(username, password, isLogin) {
    this.auth.login(username, password).subscribe(res => {
      console.log(res);
      this.token = res;
      if (res.success == true) {
        let toast = this.toastCtrl.create({
          message: 'Login successfully',
          duration: 3000,
          position: 'bottom'
        });
        this.isLogin = true;
        toast.present();
        this.navCtrl.push(SearchFlightPage);
      }
    },
    err=>{
      this.isLogin = false;
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

 logout(isLogin){
   this.auth.logout();
   let toast = this.toastCtrl.create({
          message: "Logout successfully",
          duration: 3000,
          position: 'bottom'
        });
        this.isLogin = false;
        toast.present();
        this.navCtrl.push(SearchFlightPage);
        console.log(this.isLogin);
 }

}

