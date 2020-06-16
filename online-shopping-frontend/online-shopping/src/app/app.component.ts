import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationError } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Roles, User } from './models/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'online-shopping';
  data: any;
  isAuthenticated: boolean = false;
  userRoles = Roles;
  userRole: Roles = Roles.Buyer;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private auth: AuthService) {
    this.data = this.activatedRoute.data;
    if(auth.getLoggedInUserEvent)
      auth.getLoggedInUserEvent.subscribe(user => this.changeAuthenticatedUser(user));
  }

  private changeAuthenticatedUser(user?: User){
    if(user){

      this.setUserRole(user.role);
      this.isAuthenticated = true;
    }
    else {
      this.setUserRole('');
      this.isAuthenticated = false;
    }
    
  }

  setUserRole(role: String){
    switch (role) {
      case 'Buyer':
        this.userRole = Roles.Buyer;
        break;
      case 'Seller':
        this.userRole = Roles.Seller;
        break;
      case 'Admin':
        this.userRole = Roles.Admin;
        break;
      default:
        this.userRole = Roles.Buyer;
        break;
    }
  }

  onLogOut(){
    this.auth.logout();
    this.changeAuthenticatedUser(null);

  }

}
