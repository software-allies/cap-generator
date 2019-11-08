import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapStorageAWS } from 'cap-storage-aws';
import { CapAwsRoutingModule } from './cap-aws-routing.module';
import { PhotoUploadPage } from './photo-upload/photo-upload';
import { FileUploadPage } from './file-upload/file-upload';

@NgModule({
  imports: [
    CommonModule,
    CapAwsRoutingModule,
    CapStorageAWS.forRoot({
      bucket: '<%- credentials ? credentials.awsBucket : "" %>',
      accessKeyId: '<%- credentials ? credentials.awsAccessKeyId : "" %>',
      secretAccessKey: '<%- credentials ? credentials.awsSecretAccessKey : "" %>',
      region: '<%- credentials ? credentials.awsRegion : "" %>',
      folder: '<%- credentials ? credentials.awsFolder : "" %>'
    })
  ],
  declarations: [
    PhotoUploadPage,
    FileUploadPage
  ],
  entryComponents: [
    PhotoUploadPage,
    FileUploadPage
  ]
})

export class CapAwsModule { }
