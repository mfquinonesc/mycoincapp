import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  codeNumber: string = '';
  count: number = 4;

  constructor(private router: Router) { }

  get isEnable() {
    return (this.codeNumber.length == this.count);
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
      this.router.navigateByUrl('/confirm');
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/signup');
  }
}
