import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  codeNumber: string = '';
  count: number = 4;

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

  goForward() {
    if (this.isEnable) {
      const password = this.codeNumber.substring(0, 4);
      let userAccount = new UserModel();
      this.userService.getUserAccount().subscribe({
        next:(value)=> {
          userAccount = value;
          userAccount.password = password;
        },
      });
      this.userService.setUserAccount(userAccount);
      this.router.navigateByUrl('/confirm');
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/signup');
  }
}
