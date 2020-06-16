import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'online-shopping';
  data: any;
  isAuthenticated: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.data = this.activatedRoute.data;
    if(auth.getLoggedInUserEvent)
      auth.getLoggedInUserEvent.subscribe(isAuthenticatedUser => this.changeAuthenticatedUser(isAuthenticatedUser));
  }

  private changeAuthenticatedUser(isAuthenticated: boolean){
    this.isAuthenticated = isAuthenticated;
  }

  onLogOut(){
    this.auth.logout();
  }

}
