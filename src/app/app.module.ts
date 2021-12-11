import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {  BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SearchByNamePipe } from './pipes/search-by-name.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UserHomeComponent,
    AdminHomeComponent,
    SearchByNamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000, countDuplicates: true, preventDuplicates: true}),
    HttpClientModule,
    Ng2SearchPipeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
