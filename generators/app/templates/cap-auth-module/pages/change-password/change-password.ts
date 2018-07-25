import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
      private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }
  
  presentToast(text: string) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  onSubmit(result) {
    
    if (!result) {
        this.presentToast('Change Password Successfull!');
        this.navCtrl.push(LoginPage);
    } else {
      console.log("error", result);
        this.presentToast('error: Not are valid passwords. /n ' + result);
    }

  }

  onChangePage(changePage: boolean) {
        this.navCtrl.push(LoginPage);
  }
  
}
