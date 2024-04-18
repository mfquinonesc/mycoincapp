import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private router: Router) { }

  get isEnable() {
    return (true);
  }  

  goForward() {
    if (this.isEnable) {
      this.router.navigateByUrl('/password');
    }
  }

  goBackward() {    
    this.router.navigateByUrl('/verify');
  }
}
