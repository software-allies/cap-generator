import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './cap-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule
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
