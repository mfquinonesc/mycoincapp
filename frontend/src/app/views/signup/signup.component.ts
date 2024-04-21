import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    identification: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    email: ['', [Validators.required, Validators.email]],
    emailConfirm: ['', [Validators.required, Validators.email]]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { 
    this.initialize();
  }

  get isEnable() {
    return (this.signForm.valid && this.isEmailValid);
  }

  get firstName() {
    return this.signForm.controls.firstName;
  }
  get lastName() {
    return this.signForm.controls.lastName;
  }
  get identification() {
    return this.signForm.controls.identification;
  }
  get email() {
    return this.signForm.controls.email;
  }
  get emailConfirm() {
    return this.signForm.controls.emailConfirm;
  }

  get isEmailValid() {
    return (this.emailValue == this.emailConfirmValue);
  }

  get firstNameValue() {
    return this.signForm.value.firstName;
  }
  get lastNameValue() {
    return this.signForm.value.lastName;
  }
  get identificationValue() {
    return this.signForm.value.identification;
  }
  get emailValue() {
    return this.signForm.value.email;
  }
  get emailConfirmValue() {
    return this.signForm.value.emailConfirm;
  }

  initialize() {
    this.userService.getUserAccount().subscribe({
      next:(value)=>{
        this.signForm.patchValue({
          firstName: value.firstName,
          lastName: value.lastName,
          identification: value.identification?.toString()!,
          email: value.email,
          emailConfirm: value.email
        });
      },
    });
  }

  goForward() {
    if (this.isEnable) {
      let userAccount = new UserModel();
      this.userService.getUserAccount().subscribe({
        next: (value) => {
          userAccount = value;
          userAccount.email = this.emailValue!;
          userAccount.lastName = this.lastNameValue!;
          userAccount.firstName = this.firstNameValue!;
          userAccount.identification = Number.parseInt(this.identificationValue!);
        },
      });
      this.userService.setUserAccount(userAccount);
      this.router.navigateByUrl('/password');
    }
  }

  goBackward() {
    this.router.navigateByUrl('/idtype');
  }
}
