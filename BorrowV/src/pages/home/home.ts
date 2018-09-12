import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '../../../node_modules/@ionic-native/barcode-scanner';
import { BorrowPage } from '../borrow/borrow';
import { ConfirmborrowPage } from '../confirmborrow/confirmborrow';
import { UserLogin } from '../../app/Model';
import { ManageitemPage } from '../manageitem/manageitem';
import { LoginPage } from '../login/login';
import { HttpClient } from '@angular/common/http';
import { DetailborrowPage } from '../detailborrow/detailborrow';
import { DetailitemborrowPage } from '../detailitemborrow/detailitemborrow';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username: string;
  detaildata: any;
  constructor(
    public navCtrl: NavController,
    private barcodeScanner: BarcodeScanner,
    private http: HttpClient
  ) {
    console.log("Login Now >>>" + UserLogin.userlogin);

    this.username = UserLogin.userlogin;
    console.log("username : " + this.username);

  }


  ionViewDidEnter() {
    this.http.get("https://demoionic2.azurewebsites.net/api/GetUser/ListBorrow?username=" + this.username)
      .subscribe((data: any) => {
        this.detaildata = data
        // console.log("data" + JSON.stringify(data));
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }



  barcodescan() {
    console.log("OpenQR");
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
        this.navCtrl.push(BorrowPage, { iditem: substrQR[1] });
      } else if (checkborrow = strQr.startsWith("return") == true) {

      } else if (checkborrow = strQr.startsWith("guarantee") == true) {
        this.navCtrl.push(ConfirmborrowPage, { iditem: substrQR[1] });
        console.log("substring ssss: " + substrQR[1]);
      }

      // if(substrQR == ";"){
      //   this.navCtrl.push(ManageitemPage, { LockerId: substrQR });
      // }else{
      //   this.navCtrl.push(DetailsendbackPage, { LockerId: substrQR });
      // }
      // else if(strReturn == true){

      // }
      // if (barcodeData.text === "Confirm") {
      //   this.navCtrl.push(ConfirmborrowPage);
      // }
    }).catch(err => {
      console.log('Error', err);
    });


  }

  DetailborrowPage(id) {

    this.navCtrl.push(DetailitemborrowPage,{
      dataid: id
    });
  }


}

