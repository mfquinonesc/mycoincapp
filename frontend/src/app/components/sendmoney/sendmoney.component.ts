import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionModel } from 'src/app/models/transaction-model';
import { UserModel } from 'src/app/models/user-model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css']
})
export class SendmoneyComponent {

  transForm = this.formBuilder.group({
    toPhone: ['', [Validators.required, Validators.maxLength(10)]],
    description: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });

  isLoading: boolean = false;
  fromPhone: number = 0;

  @Output() loadEvent = new EventEmitter<boolean>(false);


  constructor( private formBuilder: FormBuilder, private transactionService: TransactionService, private userService: UserService) {
    this.initialize();
  }

  get isEnable() {
    return true;
  }
  get toPhone() {
    return this.transForm.controls.toPhone;
  }
  get description() {
    return this.transForm.controls.description;
  }
  get amount() {
    return this.transForm.controls.amount;
  }

  get toPhoneValue() {
    return this.transForm.value.toPhone;
  }
  get descriptionValue() {
    return this.transForm.value.description;
  }
  get amountValue() {
    return this.transForm.value.amount;
  }

  initialize() {
    this.userService.getUserAccount().subscribe({
      next: (value) => {
        this.fromPhone = value.phone || 0;
      }
    });
  }

  updateButget() {
    this.userService.getUserByPhone(this.fromPhone).subscribe({
      next: (value) => {
        if (value.status) {
          const user = value.obj as UserModel;
          this.userService.setUserAccount(user);
          this.initialize();
        }
      },
    });
  }

  submit() {
    if (this.transForm.valid) {
      this.isLoading = true;
      this.loadEvent.emit(this.isLoading);
      const transaction = {
        toPhone: this.toPhoneValue,
        fromPhone: this.fromPhone,
        amount: this.amountValue,
        description: this.descriptionValue
      } as TransactionModel;
      this.transactionService.sendTransaction(transaction).subscribe({
        next: (value) => {
          if (value.status) {
            alert('¡Transacción realizada!');
          } else {
            alert('¡No se pudo realizar la transacción!');
          }
          this.updateButget();
        },
        complete: () => {
          this.isLoading = false;
          this.loadEvent.emit(this.isLoading);
        },
      });
    }
  }

}
