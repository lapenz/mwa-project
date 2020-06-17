import {Observable} from 'rxjs';

export enum Roles {
  Admin = 'Admin',
  Seller = 'Seller',
  Buyer = 'Buyer'
}

export class User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  role: string;
  isApprovedUser: number;
}

export class LoginInfo {
  username: string;
  password: string;
}

export class ApiResponse {

  status: number;
  message: string;
  result: any;
}

export class Product {
  _id: string;
  title: string;
  description: string;
  imagePath: string;
  price: number;
}

export class Cart {
  items = [];
  totals = 0;
}

export interface IService<T> {
  GetById(Id: number): Observable<ApiResponse>;

  Post(entity: T): Observable<ApiResponse>;

  Put(entity: T): Observable<ApiResponse>;

  Delete(Id: number): Observable<ApiResponse>;
}
