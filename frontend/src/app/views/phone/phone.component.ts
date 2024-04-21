import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodeModel } from 'src/app/models/code-model';
import { UserService } from 'src/app/services/user.service';
import { Handler } from 'src/app/utilities/handler';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent extends Handler {

  phoneNumber: string = '';
  count: number = 10;
 

  constructor(private router: Router, private userService: UserService) {
    super();
  }

  get isEnable() {
    return (this.phoneNumber.length == this.count);
  }

  generateCode() {
    const phone = Number.parseInt(this.phoneNumber.substring(0, 10));
    const codej = { phone } as CodeModel;
    this.showLoader();
    this.userService.generateCode(codej).subscribe({
      next: (value) => { 
        this.hideLoader(); 
        if (value.status) {            
          const codemodel = value.obj as CodeModel;
          this.userService.setCode(codemodel);
          this.router.navigateByUrl('/verify');
        }else{                       
          this.showAlert(value.obj);
          this.phoneNumber = '';
          this.router.navigateByUrl('/phone');
        }
      },
    });
  }

  writeText(value: string) {
    this.phoneNumber = value;
  }

  goForward() {
    if (this.isEnable) {
      this.generateCode();
    }
  }

  goBackward() {
    this.phoneNumber = '';
    this.router.navigateByUrl('/sign');
  }

}
