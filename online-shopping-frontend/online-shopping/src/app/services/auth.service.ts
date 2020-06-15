import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loginInfo, User, ApiResponse } from '../models/models';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private apiUrl = environment.apiUrl;

  private httpHeaders = new HttpHeaders()
    .set('Authorization', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService ) { }

  login(loginInfo: loginInfo) {
    let body = {
      "username": loginInfo.username,
      "password": loginInfo.password
    };
    this.http.post<ApiResponse>(this.apiUrl + 'signin', body, { responseType: 'json' }).subscribe(result => {
      if (result.status === 200) {                    
          this.setSession(result);
          this.router.navigate(['home']);
      }
      else {
        this.notificationService.showError('Invaild username or password!', 'Error');
      }
    });
  }

  signUp(user: User) {

    this.http.post<ApiResponse>(this.apiUrl + 'signup', user)
    .subscribe(
      data => {
        if(data.status == 200) {
          this.setSession(data);
          this.notificationService.showSuccess('Registration successful', 'Success');
          this.router.navigate(['login']);
        }
      },
      error => {
          this.notificationService.showError(error, 'Error');
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
