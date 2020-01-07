import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccountSFComponent } from './account-sf/account-sf.component';
import { ContactSFComponent } from './contact-sf/contact-sf.component';
import { LeadSFComponent } from './lead-sf/lead-sf.component';
import { OpportunitySFComponent } from './opportunity-sf/opportunity-sf.component';

import { AuthGuardService } from './canActivate-service';

const routes: Routes = [
  {path: ':object', component: IndexComponent, canActivate: [AuthGuardService]},

  {path: 'account/create', component: AccountSFComponent, canActivate: [AuthGuardService]},
  {path: 'account/:id', component: AccountSFComponent, canActivate: [AuthGuardService]},

  {path: 'contact/create', component: ContactSFComponent, canActivate: [AuthGuardService]},
  {path: 'contact/:id', component: ContactSFComponent, canActivate: [AuthGuardService]},

  {path: 'lead/create', component: LeadSFComponent, canActivate: [AuthGuardService]},
  {path: 'lead/:id', component: LeadSFComponent, canActivate: [AuthGuardService]},

  {path: 'opportunity/create', component: OpportunitySFComponent, canActivate: [AuthGuardService]},
  {path: 'opportunity/:id', component: OpportunitySFComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoopbackRoutingModule {}
