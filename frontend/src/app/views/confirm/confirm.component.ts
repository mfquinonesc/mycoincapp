import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
  codeNumber: string = '';
  count: number = 4;

  error: string = '¡Debe confirmar su contraseña!';
  wellcome: string = '¡Su cuenta ha sido creada!';

  isLoading: boolean = false;
  isDone: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

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
    this.isLoading = true;
    const password = this.codeNumber.substring(0, 4);       
    this.userService.getUserAccount().subscribe({
      next: (value) => {
        const userAccount = value;        
        if (password == userAccount.password) {
          userAccount.budget = 0;
          this.userService.createAccount(userAccount).subscribe({
            next: (result) => {
              if(result.status){                
                this.router.navigateByUrl('/home');
              }else{
                alert(result.obj);
              }
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        } else {
          this.isLoading = false;
          this.codeNumber = '';
          alert('¡La contraseña no coincide!');
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
