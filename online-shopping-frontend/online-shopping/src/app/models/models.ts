import {Observable} from 'rxjs';

export enum Roles {
  Admin = 'Admin',
  Seller = 'Seller',
  Buyer = 'Buyer'
}

export class User {
  _id: string;
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
  GetById(id: String): Observable<ApiResponse>;
  Post(entity: T): Observable<ApiResponse>;
  Put(entity: T): Observable<ApiResponse>;
  Delete(id: String): Observable<ApiResponse>;
}

export enum ApprovalType {
  Seller = 1,
  Review = 2,
}

export class Order {
  _id: String;
  totalPrice: Number;
  shippingPrice: Number;
  purchaseDate: Date;
  status: String;
  cart: Cart;
  billingAddress: Address;
  shippingAddress: Address;
  buyer: User;
  coupon: Coupon;
  payment: Payment;
}

export class Review {
  description: String;
  rating:Number;
}

export class Address {

}

export class Coupon {

}

export class Payment {

}
