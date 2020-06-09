import { Observable } from "rxjs";

  export class User {
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    birthDate: Date;
    role: String;
    isApprovedUser: Number;
  }

  export class loginInfo {
    userName: string;
    password: string;
  }

  export class ResponseResult<T> {
    result: T;
    message: String;
    status: String;
  
  }

  export interface IService<T> {
    GetById(Id: number): Observable<ResponseResult<T>>;
    Post(entity: T): Observable<ResponseResult<T>>;
    Put(entity: T): Observable<ResponseResult<T>>;
    Delete(Id: number): Observable<ResponseResult<T>>;
  }