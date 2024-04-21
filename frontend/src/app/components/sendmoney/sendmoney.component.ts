import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TransactionModel } from 'src/app/models/transaction-model';
import { UserModel } from 'src/app/models/user-model';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';
import { Handler } from 'src/app/utilities/handler';

@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css']
})
export class SendmoneyComponent extends Handler {

  transForm = this.formBuilder.group({
    toPhone: ['', [Validators.required, Validators.maxLength(10)]],
    description: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
  });

  fromPhone: number = 0;

  @Output() cancelEvent = new EventEmitter<boolean>(false);

  constructor(private formBuilder: FormBuilder, private transactionService: TransactionService, private userService: UserService) {
    super();
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

  cancel() {
    this.cancelEvent.emit(true);
  }

  submit() {
    if (this.transForm.valid) {
      this.showLoader();          
      const transaction = {
        toPhone: this.toPhoneValue,
        fromPhone: this.fromPhone,
        amount: this.amountValue,
        description: this.descriptionValue
      } as TransactionModel;
      this.transactionService.sendTransaction(transaction).subscribe({
        next: (value) => {
          this.hideLoader();      
          if (value.status) { 
            this.transForm.reset();             
            this.showAlert('¡Transacción realizada!');
          } else {                 
            this.showAlert(value.obj);
          }
          this.updateButget();         
        },       
      });
    }
  }

}
