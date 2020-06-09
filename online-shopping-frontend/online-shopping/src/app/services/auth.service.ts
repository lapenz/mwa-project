import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginInfo, User } from '../models/models';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  private httpHeaders = new HttpHeaders()
    .set('Authorization', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService ) { }

  login(loginInfo: loginInfo, returnUrl: string) {
    let body = {
      "username": loginInfo.userName,
      "password": loginInfo.password
    };
    this.http.post<any>(this.apiUrl + 'signin', body, { responseType: 'json' }).subscribe(response => {
      if (response.status === 200) {                    
          this.setSession(response);
          this.router.navigate([returnUrl]);
      }
      else {
        this.notificationService.showError('Invaild username or password!', 'Error');
      }
    });
  }

  private setSession(authResult: any) {
    this.setLoggedInUser(authResult.user);
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expiresIn', authResult.expiresIn)
  }
  ngOnDestroy() {
    document.body.className = "";
  }

  getExpiration() {
    const expiration: string = localStorage.getItem("expiresIn") || '';
    const expiresAt = expiration && JSON.parse(expiration);
    return new Date(expiresAt);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresIn");
    this.removeLoggedInUser();
  }

  setLoggedInUser(userParam: any) {
      let user: User = new User();
          user = userParam;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  getLoggedInUser(): User {
    if (localStorage['loggedInUser']) {
      return <User>JSON.parse(localStorage['loggedInUser']);
    }
    else {
      this.logout();
      return null;
    }
  }

  removeLoggedInUser() {
    window.localStorage.removeItem('loggedInUser');
  }

  getToken(): String {
    if (localStorage['token']) {
      return window.localStorage['token'];
    }
    else {
      this.logout();
      return null;
    }
  }

  destroyToken() {
    window.localStorage.removeItem('token');
  }
}
