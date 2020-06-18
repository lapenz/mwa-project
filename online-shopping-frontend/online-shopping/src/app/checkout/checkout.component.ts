import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Order, Cart, OrderStatus, PaymentMethod, Product } from '../models/models';
import { AuthService } from '../services/auth.service';
import { EmailValidators, CreditCardValidators } from 'ngx-validators';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { CartService } from '../services/cart.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  showFormValue : boolean = environment.showFormValue;
  signInForm: FormGroup;
  orderForm: FormGroup;
  userModel: User = new User();
  userLoggedIn: boolean = false;
  totalPrice: Number = 0;
  order: Order = new Order();
  orders: Order[] = new Array();

  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private notificationService: NotificationService,
    private cartService: CartService,
    private router: Router
    ) {

    if(authService.getLoggedInUserEvent)
    authService.getLoggedInUserEvent.subscribe(user => this.checkLoggedInUser(user));

   }

  ngOnInit(): void {
    this.orders = new Array();
    this.userModel = this.authService.getLoggedInUser();
    this.checkLoggedInUser(this.userModel);

    this.createForms();
    
    this.cartService.getCart().subscribe((res: HttpResponse<Cart>) => {
      this.setOrderCartInfo(res.body);
    }, err => {
      this.notificationService.showError(err, 'Error');
    });
  }

  onSubmit(){

    if(this.signInForm.valid) {      
      this.authService.login(this.signInForm.value);
    }
  }

  onOrderSubmit(){
    
    this.setOrderInfo();
    this.devideOrderPerSeller();
    this.orderService.Post(this.orders).subscribe(res=> {
      this.cartService.clear();
      this.notificationService.showSuccess("Your payment has been successfully issued", 'Success');
      this.router.navigate(['confirmation']);

    }, err => {
      this.notificationService.showError(err, 'Error');
    });
    this.orders =[];
    
  }

  checkLoggedInUser(user: User){    
    if(user){
      this.userLoggedIn = true;
    }
  }

  setOrderCartInfo(cart: Cart){
    this.order.products = cart.items;
    this.order.subTotalPrice = cart.items.map(a => a.price).reduce(function(a, b)
    {
      return a + b;
    });
    this.order.shippingPrice = this.order.subTotalPrice * 0.1;
    this.order.totalPrice = this.order.subTotalPrice + this.order.shippingPrice;
    
  }

  setOrderInfo(){
    const form = this.orderForm.value;
    this.order.billingAddress.firstName = form.firstName;
    this.order.billingAddress.lastName = form.lastName;
    this.order.billingAddress.phone = form.phoneNumber;
    this.order.billingAddress.city = form.city;
    this.order.billingAddress.email = form.email;
    this.order.billingAddress.streetAddress = form.streetaddress;
    this.order.billingAddress.zipCode = form.zip;
    this.order.shippingAddress = this.order.billingAddress;

    this.order.buyer = this.userModel;

    this.order.payment.status = "Done";
    this.order.payment.date = new Date();
    this.order.payment.amount = this.order.totalPrice;
    this.order.payment.paymentMethod = PaymentMethod.CREDIT;

    this.order.coupon.code = form.couponCode;
    this.order.coupon.description = '';
    //this.order.coupon.percentage = 0.1;
    this.order.coupon.expiryDate = new Date();
    

    this.order.status = OrderStatus.PENDING;
    this.order.purchaseDate = new Date();
  }

  devideOrderPerSeller(){

    let items = [...this.order.products]
    const result = this.groupBy(items, 'seller');
    let sellers = Object.keys(result);
    let newOrder = new Order();
    

    sellers.map( seller => {
      newOrder = {...this.order};
      newOrder.coupon.seller = seller;

      let prodArray = items.filter(x=> {
        return x.seller == seller
      }); 
      //newOrder.products = [];
      //newOrder.cart.items.push(prodArray);
      newOrder.products = [...prodArray];
      console.log(newOrder);
      this.orders.push(newOrder);
      console.log(prodArray);
      
      console.log(this.orders);
    });
  }

  groupBy(array, key) {
    return array.reduce((result, currentValue) => {
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      return result;
    }, {}); 
  };

  createForms(){
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.orderForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      company: [''],
      phoneNumber:['', Validators.required],
      streetaddress: ['', Validators.required],
      email: ['', [Validators.required, EmailValidators.normal]],
      city: ['', Validators.required],      
      zip:['', Validators.required],
      message:[''],
      createAnAccount:[''],
      paymentMethod:[''],
      cardNo: ['', [Validators.required, Validators.maxLength(19), Validators.minLength(13)]],
      couponCode: ['']
    });
  }

  

}
