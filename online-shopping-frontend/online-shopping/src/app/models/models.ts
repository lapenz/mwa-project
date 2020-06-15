import { Observable } from "rxjs";

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
    GetById(Id: number): Observable<ApiResponse>;
    Post(entity: T): Observable<ApiResponse>;
    Put(entity: T): Observable<ApiResponse>;
    Delete(Id: number): Observable<ApiResponse>;
  }