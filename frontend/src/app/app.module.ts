import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IntroComponent } from './views/intro/intro.component';
import { SignComponent } from './views/sign/sign.component';
import { SignupComponent } from './views/signup/signup.component';
import { PhoneComponent } from './views/phone/phone.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoldeniconComponent } from './components/goldenicon/goldenicon.component';
import { KeywordComponent } from './components/keyword/keyword.component';
import { VerifyComponent } from './views/verify/verify.component';
import { IdtypeComponent } from './views/idtype/idtype.component';
import { PasswordComponent } from './views/password/password.component';
import { ConfirmComponent } from './views/confirm/confirm.component';


@NgModule({
  declarations: [
    AppComponent,   
    IntroComponent,
    SignComponent,
    SignupComponent,
    PhoneComponent,
    GoldeniconComponent,
    KeywordComponent,
    VerifyComponent,
    IdtypeComponent,   
    PasswordComponent,
    ConfirmComponent,   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
