import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoopbackRoutingModule } from './loopback-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { IndexComponent } from './index/index.component';
import { AccountSFComponent } from './account-sf/account-sf.component';
import { ContactSFComponent } from './contact-sf/contact-sf.component';
import { LeadSFComponent } from './lead-sf/lead-sf.component';
import { OpportunitySFComponent } from './opportunity-sf/opportunity-sf.component';

@NgModule({
  declarations: [
    PaginationComponent,
    IndexComponent,
    AccountSFComponent,
    ContactSFComponent,
    LeadSFComponent,
    OpportunitySFComponent
  ],
  imports: [
    CommonModule,
    LoopbackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class LoopbackModule {}
