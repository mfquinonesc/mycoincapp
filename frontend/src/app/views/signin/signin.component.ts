import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { Handler } from 'src/app/utilities/handler';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent extends Handler {

  codeNumber: string = '';
  count: number = 4;

  signinForm = this.formBuilder.group({
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
    super();
  }

  get isEnable() {
    return (this.codeNumber.length >= this.count);
  }

  get phone() {
    return this.signinForm.controls.phone;
  }

  get phoneValue() {
    return this.signinForm.value.phone;
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



  loadAccount(phoneNumber: number) {
    this.userService.getUserByPhone(phoneNumber).subscribe({
      next: (value) => {
        const userAccount = value.obj as UserModel;
        this.userService.setUserAccount(userAccount);
      },
    });
  }

  submit() {
    if (this.isEnable) {
      const user = new UserModel();
      user.phone = Number.parseInt(this.phoneValue!) || 0;
      user.password = this.codeNumber.substring(0, 4);
      this.showLoader();
      this.userService.logInAccount(user).subscribe({
        next: (value) => {
          this.hideLoader();
          if (value.status) {           
            this.userService.setToken(value.obj);
            this.loadAccount(user.phone!);
            this.router.navigateByUrl('/home');
          } else {
            this.signinForm.reset();
            this.codeNumber = '';
            this.showAlert(value.obj);
          }
        },        
      });
    }
  }

  goBackward() {
    this.router.navigateByUrl('/sign');
  }
}
