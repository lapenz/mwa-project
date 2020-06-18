import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './Sign/signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './Sign/signup/signup.component';
import {ListProductComponent} from './list-product/list-product.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import {CartComponent} from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ApprovalsComponent } from './admin/approvals/approvals.component';
import {SellerProductsComponent} from './seller-products/seller-products.component';
import {CreateProductComponent} from './product/create/create-product.component';
import {UpdateProductComponent} from './product/update/update-product.component';


const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'products', component: ListProductComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'seller/products/create', component: CreateProductComponent },
  { path: 'seller/products/update/:id', component: UpdateProductComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/:id', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'approval', component: ApprovalsComponent },
  { path: 'seller/products', component: SellerProductsComponent },
  { path: '**', redirectTo: 'home' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
