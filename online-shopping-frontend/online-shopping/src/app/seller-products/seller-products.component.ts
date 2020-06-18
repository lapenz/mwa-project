import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {Product} from '../models/models';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-seller-products',
  templateUrl: './seller-products.component.html',
  styleUrls: ['./seller-products.component.css']
})
export class SellerProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.productService.findAllBySeller().subscribe((res: HttpResponse<Product[]>) => {
      this.products = res.body;
    });
  }

  delete(id) {
    this.productService.delete(id).subscribe(res => {
      this.load();
    });
  }

}
