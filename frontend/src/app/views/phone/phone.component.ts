import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent {

  phoneNumber: string = '';
  count:number = 10;

  constructor(private router: Router) { }

  get isEnable() {
    return (this.phoneNumber.length == this.count);
  }

  writeText(value:string){
    this.phoneNumber = value;
  }

  goForward() {
    if (this.isEnable) {
      this.router.navigateByUrl('/verify');
    }
  }

  goBackward() {
    this.phoneNumber = '';
    this.router.navigateByUrl('/sign');
  }

}
