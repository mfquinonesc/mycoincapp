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

  error:string = '¡Debe confirmar su contraseña!';
  wellcome:string = '¡Su cuenta ha sido creada!';

  isDone:boolean = false;

  constructor(private router: Router) { }

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
      // this.router.navigateByUrl('/loader');
      this.isDone = true;
    }
  }

  goBackward() {
    this.codeNumber = '';
    this.router.navigateByUrl('/sign');
  }
}
