import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificacionesPage } from './notificaciones';

@NgModule({
  declarations: [
    NotificacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificacionesPage),
  ],
})
export class NotificacionesPageModule {}
