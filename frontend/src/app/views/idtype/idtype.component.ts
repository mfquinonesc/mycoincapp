import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-idtype',
  templateUrl: './idtype.component.html',
  styleUrls: ['./idtype.component.css']
})
export class IdtypeComponent {

  constructor(private router: Router, private userService: UserService) { }

  document: string = '';

  documentTypeArray: string[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Tarjeta de identidad',
    'Pasaporte'
  ];

  get isSelected() {
    return (this.document != '');
  }

  selectDoc(value: string) {
    this.document = value;
  }

  goForward() {
    if (this.isSelected) {
      const userAccount = new UserModel();
      this.userService.getCode().subscribe({
        next: (value) => {
          userAccount.phone = value.phone;
          userAccount.docType = this.document;
          this.userService.setUserAccount(userAccount);
          this.router.navigateByUrl('/signup');
        },
      });
    }
  }

  goBackward() {
    this.document = '';
    this.userService.setCode({ phone: 0 });
    this.router.navigateByUrl('/sign');
  }

}
