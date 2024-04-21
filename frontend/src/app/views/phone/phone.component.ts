import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CodeModel } from 'src/app/models/code-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-phone',
  templateUrl: './phone.component.html',
  styleUrls: ['./phone.component.css']
})
export class PhoneComponent {

  phoneNumber: string = '';
  count: number = 10;
  isLoading: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  get isEnable() {
    return (this.phoneNumber.length == this.count);
  }

  generateCode() {
    const phone = Number.parseInt(this.phoneNumber.substring(0, 10));
    const codej = { phone } as CodeModel;
    this.isLoading = true;
    this.userService.generateCode(codej).subscribe({
      next: (value) => { 
        if (value.status) {
          const codemodel = value.obj as CodeModel;
          this.userService.setCode(codemodel);
          this.router.navigateByUrl('/verify');
        }else{          
          alert(value.obj);
          this.phoneNumber = '';
          this.router.navigateByUrl('/phone');
        }
      }, complete: () => {
        this.isLoading = false;       
      },
    });
  }

  writeText(value: string) {
    this.phoneNumber = value;
  }

  goForward() {
    if (this.isEnable) {
      this.generateCode();
    }
  }

  goBackward() {
    this.phoneNumber = '';
    this.router.navigateByUrl('/sign');
  }

}
