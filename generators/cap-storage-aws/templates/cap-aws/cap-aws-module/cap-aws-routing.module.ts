import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoUploadPage } from './photo-upload/photo-upload';
import { FileUploadPage } from './file-upload/file-upload';

const routes: Routes = [
  { path: 'image-upload', component: PhotoUploadPage },
  { path: 'file-upload', component: FileUploadPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapAwsRoutingModule { }
