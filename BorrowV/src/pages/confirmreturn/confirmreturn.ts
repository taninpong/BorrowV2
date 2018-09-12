import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../../app/Model';

/**
 * Generated class for the ConfirmreturnPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirmreturn',
  templateUrl: 'confirmreturn.html',
})
export class ConfirmreturnPage {
  username: any;
  iditem: string;
  detailitem: any;
  detaildata: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
    this.iditem = navParams.data.iditem;
    console.log("DataSend :" + JSON.stringify(this.iditem));
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ConfirmreturnPage');
  // }
  ionViewDidEnter() {
    this.username = UserLogin.userlogin;
    this.http.get("https://demoionic2.azurewebsites.net/api/GetUser/GetBorrow/" + this.iditem)
      .subscribe((data: any) => {
        this.detailitem = data.item
        this.detaildata = data.borrowname
        console.log("Datanaja : " +JSON.stringify(data));
        console.log("Username : "  +this.username);
      },
        error => {
          alert("Error: " + error + "\nError message: " + error.message + "\nError result: " + error.error)
        });
  }
  payan() {
    let option = { "headers": { "Content-Type": "application/json" } };
    // this.callpost = { id: "8", nameitem: "abcde", quantity: 12 };
    this.http.post("https://demoionic2.azurewebsites.net/api/GetUser/SendBackItem/"+this.iditem+"/"+this.detaildata+"/"+this.username,
      option).subscribe((result: any) => {
        this.navCtrl.popToRoot()
        console.log("xxxx" + result);
      }, error => {
        console.log("error"+JSON.stringify(error));
      });
  }
}
