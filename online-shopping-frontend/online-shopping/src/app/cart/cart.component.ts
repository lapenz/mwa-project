import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Cart} from '../models/models';
import {ActivatedRoute} from '@angular/router';
import {CartService} from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart = new Cart();
  constructor(private activatedRoute: ActivatedRoute, private cartService: CartService) {}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id){
      this.cartService.addOnCart(id).subscribe((res: HttpResponse<any>) => {
        console.log(res);
      });
    }
    this.cartService.getCart().subscribe((res: HttpResponse<Cart>) => {
      console.log(res);
      this.cart = res.body;
    });
  }

}
