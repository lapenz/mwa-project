import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { IService, Order, ApiResponse } from '../models/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements IService<Order>{
  private apiUrl = environment.apiUrl + 'checkout';

  constructor(private http: HttpClient, private router: Router, private notificationService: NotificationService) { }

  GetById(Id: String): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.apiUrl + Id)
      .pipe(
        catchError(err => {
          console.log('Handling error locally and rethrowing it...', err);
          return throwError(err);
        })
      );
  }
  Post(entity: Order): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.apiUrl, entity)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
  Put(entity: Order): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(this.apiUrl + entity._id, entity)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
  Delete(id: String): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(this.apiUrl + id)
    .pipe(
      catchError(err => {
        console.log('Handling error locally and rethrowing it...', err);
        return throwError(err);
      })
    );
  }
}
