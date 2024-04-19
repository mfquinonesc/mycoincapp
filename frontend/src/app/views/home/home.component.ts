import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  isLedger: boolean = false;
  isSendmoney: boolean = false;
  isHome: boolean = true;
  money: number = 0;


  constructor(private router: Router) { }

  get butget() {
    return `$${this.money}`
  }

  hideAll() {
    this.isHome = false;
    this.isLedger = false;
    this.isSendmoney = false;
  }

  showSendmoney() {
    this.hideAll();
    this.isSendmoney = true;
  }

  showLedger() {
    this.hideAll();
    this.isLedger = true;
  }

  showHome() {
    this.hideAll();
    this.isHome = true;
  }

  logOut() {
    this.router.navigateByUrl('/sign');
  }

}
