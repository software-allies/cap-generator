import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: '<%= name %>-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
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
    if (result.id) {
        this.presentToast('Register Successfull!');
        this.navCtrl.push(LoginPage);
    }
  }

  onChangePage(changePage: boolean) {
        this.navCtrl.push(LoginPage);
  }
}
