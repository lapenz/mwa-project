import { Component, OnInit } from '@angular/core';
import { User, Order } from '../models/models';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { NotificationService } from '../services/notification.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  userModel: User = new User();
  userLoggedIn: boolean = false;
  order: Order = new Order();
  orders: Order[] = new Array();
  
  constructor(private fb: FormBuilder, 
    private authService: AuthService, 
    private orderService: OrderService, 
    private notificationService: NotificationService,) { 

      if(authService.getLoggedInUserEvent)
    authService.getLoggedInUserEvent.subscribe(user => this.checkLoggedInUser(user));
    }

  ngOnInit(): void {

    this.orders = new Array();
    this.userModel = this.authService.getLoggedInUser();
    this.checkLoggedInUser(this.userModel);

    this.orderService.GetByUser().subscribe((res: HttpResponse<Order[]>) => {
      this.orders = res.body;
    });

  }

  checkLoggedInUser(user: User){    
    if(user){
      this.userLoggedIn = true;
    }
  }

}
