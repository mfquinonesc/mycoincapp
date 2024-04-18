import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-idtype',
  templateUrl: './idtype.component.html',
  styleUrls: ['./idtype.component.css']
})
export class IdtypeComponent {

  constructor(private router:Router){}

  document: string = '';

  documentType: string[] = [
    'Cédula de ciudadanía',
    'Cédula de extranjería',
    'Tarjeta de identidad',
    'Pasaporte'
  ];

  get isSelected() {
    return (this.document != '');
  }

  selectDoc(value: string) {
    this.document = value;
  }

  goForward() {
    if (this.isSelected) {
      this.router.navigateByUrl('/signup');
    }
  }

  goBackward() {
    this.document = '';
    this.router.navigateByUrl('/phone');
  }

}
