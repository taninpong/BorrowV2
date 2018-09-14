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
  idsendback: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http: HttpClient) {
    this.iddata = navParams.get("iddata");
    this.idsendback = this.iddata.id;
    console.log("DDDDD+"+JSON.stringify(this.iddata));
    console.log("idsendback+"+JSON.stringify(this.idsendback));
    this.genQrCode = "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=guaranteereturn|"+this.iddata.id;
  }

  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/History/GetSendback/"+this.iddata.id)
      .subscribe((data: any) => {
        this.detaildata = data.item
        console.log("item in payan : "+JSON.stringify(this.detaildata));
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

  

}
