import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent {
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
      alert('OK');
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/sign');
  }
}
