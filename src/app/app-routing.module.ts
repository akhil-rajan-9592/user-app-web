import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

const routes: Routes = [
  {
    path : '', component : LoginPageComponent
  },
  {
    path : 'admin-home', component : AdminHomeComponent
  },
  {
    path : 'user-home', component : UserHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
