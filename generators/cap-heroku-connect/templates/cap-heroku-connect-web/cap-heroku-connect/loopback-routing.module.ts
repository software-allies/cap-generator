import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { AccountSFComponent } from './account-sf/account-sf.component';
import { ContactSFComponent } from './contact-sf/contact-sf.component';
import { LeadSFComponent } from './lead-sf/lead-sf.component';
import { OpportunitySFComponent } from './opportunity-sf/opportunity-sf.component';

const routes: Routes = [
  {path: ':object', component: IndexComponent},

  {path: 'account/create', component: AccountSFComponent},
  {path: 'account/:id', component: AccountSFComponent},

  {path: 'contact/create', component: ContactSFComponent},
  {path: 'contact/:id', component: ContactSFComponent},

  {path: 'lead/create', component: LeadSFComponent},
  {path: 'lead/:id', component: LeadSFComponent},

  {path: 'opportunity/create', component: OpportunitySFComponent},
  {path: 'opportunity/:id', component: OpportunitySFComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoopbackRoutingModule {}
