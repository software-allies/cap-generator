import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { LocalNotificationsService, LocalNotificationsInterface, LocalNotificationsResponseInterface } from './../../app/modules/cap-local-notifications';

@Component({
  selector: 'page-local-notifications',
  templateUrl: 'local-notifications.html',
})
export class LocalNotificationsPage {

  data = { 
    title:'', 
    text:'', 
    date:'', 
    time:'' 
  };

  constructor(
    public navCtrl: NavController, 
    private LocalNotificationsService: LocalNotificationsService,
    public platform: Platform,
    public alertCtrl: AlertController) {
    platform.ready().then(() => {
    });
  };

  onSubmit() {

    const localNotification: LocalNotificationsInterface = {
        id: 1,
        title: this.data.title,
        text: this.data.text,
        date: new Date(this.data.date + " " + this.data.time),
        smallIcon: 'file://assets/imgs/icon.png',
        led: '00FF00',
        sound: (this.platform.is('android')) ? 'file://assets/sounds/rooster.mp3' : 'file://assets/sounds/rooster.caf', 
        icon: 'http://www.companiesact.in/images/HomePages/notifications_new.png'
    }

    const response: LocalNotificationsResponseInterface = this.LocalNotificationsService.setNotification(localNotification);

    let alert = this.alertCtrl.create({
      title: response.title,
      subTitle: response.subTitle,
      buttons: [response.buttons]
    });
    alert.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalNotifications');
  }

}








