import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

<% if (imports && imports.auth) { -%>
  {
    path: 'auth',
    loadChildren: './modules/cap-auth/cap-auth.module#CapAuthModule' ,
  },
<% } -%>
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
