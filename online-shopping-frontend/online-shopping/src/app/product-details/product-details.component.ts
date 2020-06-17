import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../services/product.service';
import {HttpResponse} from '@angular/common/http';
import {Product} from '../models/models';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  id: string;
  product: Product = new Product();

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.findById(id).subscribe((res: HttpResponse<Product>) => {
      console.log(res);
      this.product = res.body;
    });

    this.loadScripts();
  }

  loadScripts() {
      const externalScriptArray = [
        "assets/js/vendor/modernizr-3.5.0.min.js",
        "assets/js/vendor/jquery-1.12.4.min.js",
        "assets/js/popper.min.js",
        "assets/js/bootstrap.min.js",
        "assets/js/jquery.slicknav.min.js",
        "assets/js/owl.carousel.min.js",
        "assets/js/slick.min.js",
        "assets/js/wow.min.js",
        "assets/js/animated.headline.js",
        "assets/js/jquery.magnific-popup.js",
        "assets/js/jquery.scrollUp.min.js",
        "assets/js/jquery.nice-select.min.js",
        "assets/js/jquery.sticky.js",
        "assets/js/contact.js",
        "assets/js/jquery.form.js",
        "assets/js/jquery.validate.min.js",
        "assets/js/mail-script.js",
        "assets/js/jquery.ajaxchimp.min.js",
        "assets/js/plugins.js",
        "assets/js/main.js",
        "assets/js/swiper.min.js",
        "assets/js/mixitup.min.js",
        "assets/js/jquery.counterup.min.js",
        "assets/js/waypoints.min.js"
      ];
      for (let i = 0; i < externalScriptArray.length; i++) {
        const scriptTag = document.createElement('script');
        scriptTag.src = externalScriptArray[i];
        scriptTag.type = 'text/javascript';
        scriptTag.async = false;
        document.getElementsByTagName('body')[0].appendChild(scriptTag);
      }
    }

}
