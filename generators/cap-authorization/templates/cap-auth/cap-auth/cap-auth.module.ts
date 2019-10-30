import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './cap-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotComponent
  ],
  entryComponents:[
    RegisterComponent,
    LoginComponent,
    ForgotComponent
  ]
})
export class CapAuthModule { }
