import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SignupComponent } from './Sign/signup/signup.component';
import { SigninComponent } from './Sign/signin/signin.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MasterpageComponent,
    HomeComponent,
  ],
  
  providers: [],
  bootstrap: [AppComponent],
  exports: [SigninComponent, SignupComponent, HomeComponent, MasterpageComponent]
})
export class AppModule { }
