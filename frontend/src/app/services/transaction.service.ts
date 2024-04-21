import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TransactionModel } from '../models/transaction-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  pathTrans: string = `${environment.path}/transaction`;

  constructor(private http: HttpClient) { }

  sendTransaction(transaction: TransactionModel): Observable<any> {
    return this.http.post(this.pathTrans, transaction);
  }

  getAllTransactionsByPhone(phone: number): Observable<any> {
    return this.http.get(`${this.pathTrans}/${phone}`);
  }
}
