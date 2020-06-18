import { Component, OnInit } from '@angular/core';
import {OrderService} from '../services/order.service';
import {ActivatedRoute} from '@angular/router';
import {Order} from '../models/models';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  order: Order = new Order();
  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.orderService.GetById(id).subscribe(res => {
      this.order = res.result;
    });
  }

}
