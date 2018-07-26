import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

<% if (imports.awsStorage) { -%>
import { CapStorageAWS } from 'cap-storage-aws';
<% } -%>

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    AppComponent,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent)<%- typeof imports !== 'undefined' ? "," : "" -%>
    <% if (imports.awsStorage) { %>
    CapStorageAWS.forRoot({
      bucket: 'your-bocket',
      accessKeyId: 'your-accessKeyID',
      secretAccessKey: 'your-secretAccessKey',
      region: 'your-region',
      folder: 'your-folder'
    })
    <% } %>
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}

