import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValidatorsModule } from 'ngx-validators';
import { SignupComponent } from './Sign/signup/signup.component';
import { SigninComponent } from './Sign/signin/signin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ValidatorsModule
  ],
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent,
    ListProductComponent,
    ProductDetailsComponent,
    CartComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [SigninComponent, SignupComponent, HomeComponent]
})
export class AppModule { }
