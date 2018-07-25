import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

/*********** AQUÍ IMPORTARÍAS LOS MÓDULOS
import { MessagesModule } from './modules/cap-messages';
import { AuthenticationModule } from './modules/cap-authentication';
import { MediaModule } from './modules/cap-storage-cloudinary';
import { LocalNotificationsModule } from './modules/cap-local-notifications';
***********/

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// import { ChangePasswordPage } from './../pages/change-password/change-password';
// import { RegisterPage } from './../pages/register/register';
// import { LoginPage } from './../pages/login/login';
// import { NotificacionesPage } from './../pages/notificaciones/notificaciones';
// import { PhotoListPage } from './../pages/photo-list/photo-list';
// import { PhotoUploadPage } from './../pages/photo-upload/photo-upload';
// import { LocalNotificationsPage } from './../pages/local-notifications/local-notifications';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    /*** LOS COMPONENTES SIGUIENTES SON LAS PÁGINAS QUE SE CREARÍAN PARA INCLUIR DENTRO DE ELLAS LOS TAGS CON LOS SELECTORES DE LOS COMPONENTES: ***/
    // ChangePasswordPage,
    // RegisterPage,
    // LoginPage,
    // NotificacionesPage,
    // PhotoListPage,
    // PhotoUploadPage,
    // LocalNotificationsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    /*********** AQUÍ IMPORTARÍAS LOS MÓDULOS
    LocalNotificationsModule.forRoot({}),
    AuthenticationModule.forRoot({
      apiUrl: 'http://localhost:3000/api/',
      loginEndpoint: 'users'
    }),
    MessagesModule.forRoot({
      wsUrl: 'http://localhost:3000',
      apiUrl: 'http://localhost:3000/api/'
    }),
    MediaModule.forRoot({
      cloud_name: 'softwareallies',
      upload_preset: 'cemhwwfa'
    }),
    ***********/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    /*** LOS COMPONENTES SIGUIENTES SON LAS PÁGINAS QUE SE CREARÍAN PARA INCLUIR DENTRO DE ELLAS LOS TAGS CON LOS SELECTORES DE LOS COMPONENTES: ***/
    // ChangePasswordPage,
    // RegisterPage,
    // LoginPage,
    // NotificacionesPage,
    // PhotoListPage,
    // PhotoUploadPage,
    // LocalNotificationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}

