import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the DetailsendbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailsendback',
  templateUrl: 'detailsendback.html',
})
export class DetailsendbackPage {
  iddata: any;
  detaildata: any;
  genQrCode: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
    this.iddata = navParams.get("iddata");
    console.log("DDDDD+"+this.iddata);
    this.genQrCode = "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=guaranteereturn|"+this.iddata;
  }

  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/History/GetBorrow/"+this.iddata)
      .subscribe((data: any) => {
        this.detaildata = data.item
        console.log("item in payan : "+JSON.stringify(this.detaildata));
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

  

}
