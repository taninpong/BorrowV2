import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DetailsendbackPage } from '../detailsendback/detailsendback';
import { HttpClient } from '@angular/common/http';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner,private http: HttpClient) {
    this.iddata = this.navParams.get("dataid");
    console.log("xxxx"+this.iddata);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SendbackPage');
  }
  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/GetUser/ListBorrow/"+this.iddata)
      .subscribe((data: any) => {
        this.detaildata = data.item
        console.log("xyz"+data);
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

  scanqr(){
    this.barcodeScanner.scan().then(barcodeData => {
      //QR : "borrow;f66cd89f-f52c-45fe-ab6e-083078894434"
      var strQr = barcodeData.text;
      var checkborrow = null;
      // // strQr.startsWith("borrow")
      // // var strReturn = strQr.startsWith("return");
      // console.log(strQr);
      //QR : "f66cd89f-f52c-45fe-ab6e-083078894434"
      // var stringQR = barcodeData.text;
      var substrQR = strQr.split("|");

      console.log("substring : " + substrQR[1]);

      if (checkborrow = strQr.startsWith("borrow") == true) {
        // this.navCtrl.push(BorrowPage, { iditem: substrQR[1] });
      } else if (checkborrow = strQr.startsWith("return") == true) {

      } else if (checkborrow = strQr.startsWith("guarantee") == true) {
        this.navCtrl.push(DetailsendbackPage);
        // this.navCtrl.push(ConfirmborrowPage, { iditem: substrQR[1] });
        console.log("substring ssss: " + substrQR[1]);
      }

     
    }).catch(err => {
      console.log('Error', err);
    });
    this.navCtrl.push(HomePage);
  }

}
