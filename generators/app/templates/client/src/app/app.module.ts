import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
<% if (imports && imports.liveChat) { %>
import { CapLiveChatModule } from './modules/cap-live-chat/cap-live-chat.module';
<% } -%>

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    <% if (imports && imports.liveChat) { %>
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
    })<% } -%>
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
