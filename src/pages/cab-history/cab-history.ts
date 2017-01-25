import { Component } from '@angular/core';
import { NavController,ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the CabHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cab-history',
  templateUrl: 'cab-history.html'
})
export class CabHistoryPage {

  divShow:boolean=false;
   myDate:String=new Date().toISOString();

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, public navParams: NavParams) {
    // console.log(this.navParams.get("data"));
    if(this.navParams.get("data")=="postcab"){
      this.divShow=false;
    }else{
       this.divShow=true;
    }
  }


   dismiss() {
    this.viewCtrl.dismiss();
  }

}
