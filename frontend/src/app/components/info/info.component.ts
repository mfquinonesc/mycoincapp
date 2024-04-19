import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  accountName: string = 'JHON DOE';
  value: number = -15000;

  get negative() {
    return `- $${Math.abs(this.value)}`;
  }

  get positive() {
    return `+ $${Math.abs(this.value)}`;
  }

  get isIncome() {
    return (this.value >= 0) ? true : false;
  }

}
