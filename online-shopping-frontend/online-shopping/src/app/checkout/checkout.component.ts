import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Order, Cart, OrderStatus, PaymentMethod } from '../models/models';
import { AuthService } from '../services/auth.service';
import { EmailValidators, CreditCardValidators } from 'ngx-validators';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { CartService } from '../services/cart.service';
import { HttpResponse } from '@angular/common/http';

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
  
  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private notificationService: NotificationService,
    private cartService: CartService
    ) {

    if(authService.getLoggedInUserEvent)
    authService.getLoggedInUserEvent.subscribe(user => this.checkLoggedInUser(user));

   }

  ngOnInit(): void {
    
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

    this.orderService.Post(this.order).subscribe(res=> {
      this.notificationService.showSuccess("Your payment has been successfully issued", 'Success');
    }, err => {
      this.notificationService.showError(err, 'Error');
    })
  }

  checkLoggedInUser(user: User){    
    if(user){
      this.userLoggedIn = true;
    }
  }

  setOrderCartInfo(cart: Cart){
    this.order.cart = cart;
    this.order.subTotalPrice = cart.items.map(a => a.price).reduce(function(a, b)
    {
      return a + b;
    });
    this.order.totalPrice = this.order.subTotalPrice + this.order.shippingPrice;
  }

  setOrderInfo(){
    const form = this.orderForm.value;
    this.order.billingAddress.firstName = form.firstName;
    this.order.billingAddress.lastName = form.lastName;
    this.order.billingAddress.phone = form.phone;
    this.order.billingAddress.city = form.city;
    this.order.billingAddress.email = form.email;
    this.order.billingAddress.streetAddress = form.streetAddress;
    this.order.billingAddress.zipCode = form.zipCode;
    this.order.shippingAddress = this.order.billingAddress;

    this.order.buyer = this.userModel;

    this.order.payment.status = "Done";
    this.order.payment.date = new Date();
    this.order.payment.amount = this.order.totalPrice;
    this.order.payment.paymentMethod = PaymentMethod.CREDIT;

    this.order.status = OrderStatus.PENDING;
    this.order.purchaseDate = new Date();
  }

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
      cardNo: ['', [Validators.required, Validators.maxLength(19), Validators.minLength(13)]]
    });
  }

}
