import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserLogin } from '../../app/Model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  signupform: FormGroup;
  myform: FormGroup;
  userData = { "username": ""};
  
    logForm(form) {
    console.log(form.value)
  }
  username: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.signupform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1), Validators.maxLength(30)]),
    });
  }
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    UserLogin.userlogin=this.userData.username;
    this.navCtrl.setRoot(HomePage);
  }

}
