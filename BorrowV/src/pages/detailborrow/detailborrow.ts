import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DetailborrowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailborrow',
  templateUrl: 'detailborrow.html',
})
export class DetailborrowPage {
  itemid: any;
  nameslot: any;
  item: any;
  genQrCode: string;
  xxx: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.xxx = navParams.data.result;
    console.log("xxxxxxxxxxxxxxxxx"+JSON.stringify(this.xxx));
    
    this.itemid = navParams.get('result');
    // console.log("IDITEM : "+JSON.stringify(this.itemid));
    this.nameslot = this.itemid.slotname;
    this.item = this.itemid.item;

    // console.log("slotname : "+JSON.stringify(this.nameslot));
    // console.log("slotname : "+JSON.stringify(this.item));
    // console.log("IDIDIDID : "+this.itemid.id);
    this.genQrCode = "https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=guaranteeborrow|"+this.itemid.id;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad DetailborrowPage');
  }

}
