import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'online-shopping';
  data: any;
  cartQuantity = 0;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.data = this.activatedRoute.data;
    // this.loadScripts();
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
      "assets/js/main.js"
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
