import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntroComponent } from './views/intro/intro.component';
import { SignComponent } from './views/sign/sign.component';
import { SignupComponent } from './views/signup/signup.component';
import { PhoneComponent } from './views/phone/phone.component';
import { VerifyComponent } from './views/verify/verify.component';
import { IdtypeComponent } from './views/idtype/idtype.component';
import { PasswordComponent } from './views/password/password.component';
import { ConfirmComponent } from './views/confirm/confirm.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'sign', component: SignComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'phone', component: PhoneComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'idtype', component: IdtypeComponent },
  { path: 'password', component: PasswordComponent },
  { path: 'confirm', component: ConfirmComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
