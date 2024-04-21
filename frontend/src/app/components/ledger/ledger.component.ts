import { Component, EventEmitter, Output } from '@angular/core';
import { TransactionModel } from 'src/app/models/transaction-model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.css']
})
export class LedgerComponent {

  isLoading: boolean = false;
  fromPhone: number = 0;
  transArray: TransactionModel[] = [];
  @Output() loadEvent = new EventEmitter<boolean>(false);

  constructor(private transactionService: TransactionService, private userService: UserService) {
    this.isLoading = false;
    this.initialize();   
  }

  initialize() {
    this.userService.getUserAccount().subscribe({
      next: (value) => {
        this.fromPhone = value.phone || 0;
        this.loadTransactions();
      }
    });
  }

  loadTransactions() {
    this.isLoading = true;
    this.loadEvent.emit(this.isLoading);
    this.transactionService.getAllTransactionsByPhone(this.fromPhone).subscribe({
      next: (value) => {
        if (value.status) {
          this.transArray = value.obj as TransactionModel[];
        } else {
          this.transArray = [];
        }
      },
      complete: () => {
        this.isLoading = false;
        this.loadEvent.emit(this.isLoading);
      },
    });
  }
}
