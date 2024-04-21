import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Handler } from 'src/app/utilities/handler';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent extends Handler {
  codeNumber: string = '';
  count: number = 4;  
  phoneNumber: number = 0; 

  constructor(private router: Router, private userService: UserService) {   
    super();
    this.initialize();
  }

  get isEnable() {
    return (this.codeNumber.length == this.count);
  }

  get code1() {
    return this.codeNumber.charAt(0);
  }
  get code2() {
    return this.codeNumber.charAt(1);
  }
  get code3() {
    return this.codeNumber.charAt(2);
  }
  get code4() {
    return this.codeNumber.charAt(3);
  }

  initialize() {
    this.userService.getCode().subscribe({
      next: (value) => {
        this.phoneNumber = value.phone;
         //the next line must be eliminited when the smss were done
        const message = `¡Recivirá un mensaje con el número de verificación! ${value.code}`;
        this.showAlert(message);
      },
    });
  }

  writeText(value: string) {
    this.codeNumber = value;
  }

  goForward() {
    if (this.isEnable) {
      const typedcode = Number.parseInt(this.codeNumber.substring(0, 4));
      this.showLoader();
      this.userService.verifyPhoneAndCode(this.phoneNumber,typedcode).subscribe({
        next:(value)=> { 
          this.hideLoader();                 
          if(value.obj){
            this.router.navigateByUrl('/idtype');
          }else{
            this.codeNumber = '';
            alert('¡Código incorrecto!');
          }          
        },        
      });      
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/phone');
  }
}
