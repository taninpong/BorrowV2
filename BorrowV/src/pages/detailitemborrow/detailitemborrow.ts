import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SendbackPage } from '../sendback/sendback';

/**
 * Generated class for the DetailitemborrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailitemborrow',
  templateUrl: 'detailitemborrow.html',
})
export class DetailitemborrowPage {
  datas: any;
  detaildata: any;
  dataid: any;
  ckid:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.datas = navParams.get("dataid");
    console.log("data" + this.datas);
  }


  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/GetUser/GetBorrow/" + this.datas)
      .subscribe((data: any) => {
        this.dataid = data.id
        this.detaildata = data.item
        console.log(data);
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

  sendback(id) {
    this.navCtrl.push(SendbackPage, {
      dataid: id
      
    });
    console.log("IDsendback : "+this.dataid);
  }

}
