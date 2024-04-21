import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent {

  @Input() description: string  = '';
  @Input() value: number = -15000;

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
