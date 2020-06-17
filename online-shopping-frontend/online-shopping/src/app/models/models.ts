import { Observable } from "rxjs";


export enum Roles {
  Admin = 'Admin',
  Seller = 'Seller',
  Buyer = 'Buyer'
}

export enum ApprovalType {
  Seller = 1,
  Review = 2,
}

  export class User {
    _id: String;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    role: String;
    isApprovedUser: Number;
  }

  export class loginInfo {
    username: string;
    password: string;
  }

  export class ApiResponse {

    status: number;
    message: string;
    result: any;
  }

  export interface IService<T> {
    GetById(id: String): Observable<ApiResponse>;
    Post(entity: T): Observable<ApiResponse>;
    Put(entity: T): Observable<ApiResponse>;
    Delete(id: String): Observable<ApiResponse>;
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

export class Cart {
  items: Product;
  totals: Number;
}

export class Product {
  title: String;
  description: String;
  price: Number;
  quantity: Number;
  imagePath: String;
  seller: User;
  reviews: Review;
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
