import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CapAuthModule } from './modules/cap-auth/cap-auth.module';
<% if (authService === 'firebase') { %>
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';<% } -%>
<% if (imports && imports.liveChat) { %>
import { CapLiveChatModule } from './modules/cap-live-chat/cap-live-chat.module';<% } -%>
<% if(imports && imports.awsStorage){%>
import { CapAwsModule } from './modules/cap-aws-module/cap-aws.module'<% } -%>

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,<%if(authService === 'auth0'){%>
    CapAuthModule.forRoot({
      clientId: '<%- credentials ? credentials.AUTH0_CLIENT_ID : "" %>',
      clientSecret: '<%- credentials ? credentials.AUTH0_CLIENT_SECRET : "" %>',
      domain: '<%- credentials ? credentials.AUTH0_DOMAIN : "" %>'
    }),<% } %><% if (authService === 'firebase') { %>
    CapAuthModule,
    AngularFireModule.initializeApp({
      apiKey: '<%- credentials ? credentials.apiKey : "" %>',
      authDomain: '<%- credentials ? credentials.authDomain : "" %>',
      databaseURL:'<%- credentials ? credentials.databaseURL : "" %>',
      projectId: '<%- credentials ? credentials.projectId : "" %>',
      storageBucket: '<%- credentials ? credentials.storageBucket : "" %>',
      messagingSenderId: '<%- credentials ? credentials.messagingSenderId : "" %>',
      appId: '<%- credentials ? credentials.appId : "" %>',
      measurementId:'<%- credentials ? credentials.measurementId : "" %>'
    }),
    AngularFireAuthModule,<% } %><% if (imports && imports.liveChat) { %>
    CapLiveChatModule.forRoot({
      embeddedServiceName: 'liveChat-embeddedServiceName',
      idServiceName: 'liveChat-idServiceName',
      urlSandbox: 'liveChat-urlSandbox',
      urlDomain: 'liveChat-urlDomain',
      baseLiveAgentContentURL: 'liveChat-baseLiveAgentContentURL',
      deploymentId: 'liveChat-deploymentId',
      buttonId: 'liveChat-buttonId',
      baseLiveAgentURL: 'liveChat-baseLiveAgentURL',
      scriptUrl: 'liveChat-scriptUrl',
    }),<% } %><% if(imports && imports.awsStorage){%>
    CapAwsModule,<% } %>
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
