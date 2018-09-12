import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
  data: any;
  detaildata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
    this.data = navParams.get("dataid");
    console.log("data"+this.data);
  }

  
  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/GetUser/GetBorrow?id=" + this.data)
      .subscribe((data: any) => {
        this.detaildata = data.item
        console.log(data);
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

}
