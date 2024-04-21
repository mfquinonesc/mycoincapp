import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { CodeModel } from '../models/code-model';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _codeAccount = new BehaviorSubject<CodeModel>({ phone: 0 });
  private _userAccount = new BehaviorSubject<UserModel>(new UserModel());

  pathCode: string = `${environment.path}/code`;
  pathAuth: string = `${environment.path}/auth`;
  pathUser: string = `${environment.path}/user`;

  constructor(private http: HttpClient) { }

  setUserAccount(value: UserModel) {
    this._userAccount.next(value);
  }

  getUserAccount(): Observable<UserModel> {
    return this._userAccount.asObservable();
  }

  setCode(value: CodeModel) {
    this._codeAccount.next(value);
  }

  getCode(): Observable<CodeModel> {
    return this._codeAccount.asObservable();
  }

  logInAccount(user: UserModel): Observable<any> {
    return this.http.post(`${this.pathAuth}/signin`, user);
  }

  getUserByPhone(phone: number): Observable<any> {
    return this.http.get(`${this.pathUser}/${phone}`);
  }

  createAccount(user: UserModel): Observable<any> {
    return this.http.post(`${this.pathAuth}/signup`, user);
  }

  generateCode(code: CodeModel): Observable<any> {
    return this.http.post(this.pathCode, code);
  }

  verifyPhoneAndCode(phone: number, code: number): Observable<any> {
    return this.http.get(`${this.pathCode}/verify/${phone}/${code}`);
  }

}
