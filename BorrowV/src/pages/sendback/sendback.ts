import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DetailsendbackPage } from '../detailsendback/detailsendback';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../app/Model';

/**
 * Generated class for the SendbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sendback',
  templateUrl: 'sendback.html',
})
export class SendbackPage {

  iddata: any;
  detaildata: any;
  data: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner, private http: HttpClient) {
    this.iddata = this.navParams.get("dataid");
    console.log("xxxx" + this.iddata);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad SendbackPage');
  // }
  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/History/GetBorrow/" + this.iddata)
      .subscribe((data: any) => {
        this.data = data
        this.detaildata = data.item
        console.log("Data : " + JSON.stringify(this.data));
        console.log("Detaildata : " + JSON.stringify(this.detaildata));
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

  scanqr() {
    this.barcodeScanner.scan().then(barcodeData => {
      var strQr = barcodeData.text;
      var checkborrow = null;
      var substrQR = strQr.split("|");
      // console.log("substring : " + substrQR[1]);
      if (checkborrow = strQr.startsWith("borrow") == true) {
      } else if (checkborrow = strQr.startsWith("sendback") == true) {
        let option = { "headers": { "Content-Type": "application/json" } };
        this.http.post("https://demoionic2.azurewebsites.net/api/History/Sendback/" + this.iddata + "/" + UserLogin.userlogin,
          this.detaildata,
          option).subscribe((result: any) => {
            this.navCtrl.push(DetailsendbackPage, {
              iddata: result
            });
            // console.log("xxxxxxxxxxx" + this.iddata);
            // console.log("yyyyyyyyyyyy" + JSON.stringify(result));
            // console.log("zzzzzzz" + JSON.stringify(UserLogin.userlogin));
          }, error => {
            console.log("error" + JSON.stringify(error));
          });
        // this.navCtrl.push(DetailsendbackPage, { iditem: substrQR[1] });
        // console.log("Checkidnaja : " + this.iddata);

      } else if (checkborrow = strQr.startsWith("guarantee") == true) {
        this.navCtrl.push(DetailsendbackPage);
        // this.navCtrl.push(ConfirmborrowPage, { iditem: substrQR[1] });
        console.log("substring ssss: " + substrQR[1]);
      }
    }).catch(err => {
      console.log('Error', err);
    });
    // this.navCtrl.push(HomePage);
  }

}
