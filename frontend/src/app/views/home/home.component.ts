import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

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
  name: string = 'NAME';

  constructor(private router: Router, private userService: UserService) {
    this.initialize();
  }

  get butget() {
    return `$${this.money}`
  }

  initialize() {
    this.userService.getUserAccount().subscribe({
      next: (value) => {
        this.money = value.budget || 0;
        this.name = value.firstName?.toUpperCase() || 'NAME';
      },
    });
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
    this.userService.setUserAccount(new UserModel());
    this.router.navigateByUrl('/sign');
  }

}
