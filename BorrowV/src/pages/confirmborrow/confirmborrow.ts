import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../app/Model';

/**
 * Generated class for the ConfirmborrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmborrow',
  templateUrl: 'confirmborrow.html',
})
export class ConfirmborrowPage {
  iditem: any;
  detaildata: string;
  detailitem: any;
  username: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.iditem = navParams.data.iditem;
    console.log("DataSend :" + JSON.stringify(this.iditem));
  }
  // 


  ionViewDidEnter() {
    this.username = UserLogin.userlogin;
    this.http.get("https://demoionic2.azurewebsites.net/api/History/GetBorrow/" + this.iditem)
      .subscribe((data: any) => {
        this.detailitem = data.item
        this.detaildata = data.borrowname
        console.log("Lockker" +JSON.stringify(data));
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ConfirmborrowPage');
  // }
  // /api/GetUser/ConfirmBorrow/{id}/{witnessname}
  payan() {
    let option = { "headers": { "Content-Type": "application/json" } };
    // this.callpost = { id: "8", nameitem: "abcde", quantity: 12 };
    this.http.post("https://demoionic2.azurewebsites.net/api/History/ConfirmBorrow/" + this.iditem + "/" + this.username,
      option).subscribe((result: any) => {
        this.navCtrl.popToRoot()
        console.log("xxxx" + result);
      }, error => {
        console.log("error"+JSON.stringify(error));
      });
  }
}

