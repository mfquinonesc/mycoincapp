import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  codeNumber: string = '';
  count: number = 4;
  message: string = '¡Recivirá un mensaje con el número de verificación!';
  phoneNumber: number = 0;
  isLoading: boolean = false;  
 

  constructor(private router: Router, private userService: UserService) {   
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
        this.message = `${this.message}  ${value.code}`;
      },
    });
  }

  writeText(value: string) {
    this.codeNumber = value;
  }

  goForward() {
    if (this.isEnable) {
      const typedcode = Number.parseInt(this.codeNumber.substring(0, 4));
      this.userService.verifyPhoneAndCode(this.phoneNumber,typedcode).subscribe({
        next:(value)=> {
          this.isLoading = true;          
          if(value.obj){
            this.router.navigateByUrl('/idtype');
          }else{
            this.codeNumber = '';
            alert('¡Código incorrecto!');
          }          
        },
        complete: () => {
          this.isLoading = false;          
        },
      });      
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/phone');
  }
}
