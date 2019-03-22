import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInPage } from './sign-in';
import {AuthProvider} from "../../../providers/auth/auth";

@NgModule({
  declarations: [
    SignInPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInPage),
  ],
  providers: [
      AuthProvider
  ]
})
export class SignInPageModule {}
