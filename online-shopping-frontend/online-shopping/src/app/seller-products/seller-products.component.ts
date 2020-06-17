import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Product} from '../models/models';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  private products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findAllBySeller().subscribe((res: HttpResponse<Product[]>) => {
      console.log(res);
      this.products = res.body;
    });
  }

}
