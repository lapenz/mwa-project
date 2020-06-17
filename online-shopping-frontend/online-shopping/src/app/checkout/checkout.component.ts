import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User, Order } from '../models/models';
import { AuthService } from '../services/auth.service';
import { EmailValidators } from 'ngx-validators';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  showFormValue : boolean = environment.showFormValue;
  signInForm: FormGroup;
  billingForm: FormGroup;
  userModel: User = new User();
  userLoggedIn: boolean = false;
  totalPrice: Number = 0;
  order: Order = new Order();
  @Input() orderId: String;
  constructor(private fb: FormBuilder, private authService: AuthService, private orderService: OrderService, 
    private notificationService: NotificationService) {
    if(authService.getLoggedInUserEvent)
    authService.getLoggedInUserEvent.subscribe(user => this.checkLoggedInUser(user));

   }

  ngOnInit(): void {
    
    this.userModel = this.authService.getLoggedInUser();
    this.checkLoggedInUser(this.userModel);

    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.billingForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      company: [''],
      phoneNumber:['', Validators.required],
      streetaddress: ['', Validators.required],
      email: ['', [Validators.required, EmailValidators.normal]],
      city: ['', Validators.required],      
      zip:['', Validators.required],
      message:[''],
      createAnAccount:['']
    });

    this.orderService.GetById(this.orderId)
    .subscribe(
      res => {
      this.order = res.result;
    },
    err => {
      this.notificationService.showError(err.error.result.err, 'Error');
    }
    );

  }

  onSubmit(){

    if(this.signInForm.valid) {      
      this.authService.login(this.signInForm.value);
    }
  }
  onBillingSubmit(){

  }

  checkLoggedInUser(user: User){    
    if(user){
      this.userLoggedIn = true;
    }
  }

  

}
