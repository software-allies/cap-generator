import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

<% if (imports && imports.awsStorage) { -%>
import { CapStorageAWS } from 'cap-storage-aws';

import { PhotoListPage } from '../pages/photo-list/photo-list';
import { PhotoUploadPage } from '../pages/photo-upload/photo-upload';
<% } -%>
import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  declarations: [
    AppComponent,
    HomePage<%- imports ?  ',' : '' -%>
    <% if (imports && imports.awsStorage) { %>
    PhotoListPage,
    PhotoUploadPage
    <% } %>
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(AppComponent)<%- typeof imports !== 'undefined' ? "," : "" -%>
    <% if (imports && imports.awsStorage) { %>
    CapStorageAWS.forRoot({
      bucket: '<%- aws && aws.bucket %>',
      accessKeyId: '<%- aws && aws.accessKeyId %>',
      secretAccessKey: '<%- aws && aws.secretAccessKey %>',
      region: '<%- aws && aws.region %>',
      folder: '<%- aws && aws.folder %>'
    })
    <% } %>
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage<%- imports ?  ',' : '' -%>
    <% if (imports && imports.awsStorage) { %>
    PhotoListPage,
    PhotoUploadPage
    <% } %>
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

