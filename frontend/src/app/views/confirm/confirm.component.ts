import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { Handler } from 'src/app/utilities/handler';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent extends Handler{

  codeNumber: string = '';
  count: number = 4;

  constructor(private router: Router, private userService: UserService) {
    super();
  }

  get isEnable() {
    return (this.codeNumber.length >= this.count);
  }

  get code1() {
    return this.codeNumber.charAt(0) ? 'X' : '';
  }
  get code2() {
    return this.codeNumber.charAt(1) ? 'X' : '';
  }
  get code3() {
    return this.codeNumber.charAt(2) ? 'X' : '';
  }
  get code4() {
    return this.codeNumber.charAt(3) ? 'X' : '';
  }

  writeText(value: string) {
    this.codeNumber = value;
  }

  createAccount() {   
    this.showLoader();
    const password = this.codeNumber.substring(0, 4);       
    this.userService.getUserAccount().subscribe({
      next: (value) => {
        const userAccount = value;        
        if (password == userAccount.password) {
          userAccount.budget = 0;
          this.userService.createAccount(userAccount).subscribe({
            next: (result) => {
              this.hideLoader();
              if(result.status){                               
                this.router.navigateByUrl('/home');
              }else{
                this.showAlert(result.obj);
              }
            },            
          });
        } else {
          this.hideLoader();
          this.codeNumber = '';
          this.showAlert('¡La contraseña no coincide!');
        }
      },
    });
  }

  goForward() {
    if (this.isEnable) {
      this.createAccount();
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/password');
  }
}
