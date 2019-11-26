import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config.service';
import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './cap-auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ProfileComponent } from './profile/profile.component';
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
    ForgotComponent,
    ProfileComponent
  ],
  entryComponents:[
    RegisterComponent,
    LoginComponent,
    ForgotComponent,
    ProfileComponent
  ]
})
export class CapAuthModule {<%if(authService === 'auth0'){%>
  static forRoot(config: ConfigService): ModuleWithProviders {
    return {
        ngModule: CapAuthModule,
        providers: [
            {
                provide: ConfigService,
                useValue: config
            }
        ]
    };
  }<% } %>
}
