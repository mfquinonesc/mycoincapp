import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent {
  codeNumber: string = '';
  count: number = 4;
  message:string = '¡Recivirá un mensaje con el número de verificación!';

  constructor(private router: Router) { }

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

  writeText(value: string) {
    this.codeNumber = value;
  }

  goForward() {
    if (this.isEnable) {
      this.router.navigateByUrl('/idtype');
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/phone');
  }
}
