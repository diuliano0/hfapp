/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 * 
 * This File Represent Sign In Component
 * File path - '../../../src/pages/authentication/sign-in/sign-in'
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  // Sign In Form
  signInForm: any;

  // Email Validation Regex Patter
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(false); // Disable SideMenu
  }

  /** Do any initialization */
  ngOnInit() {
    this.formValidation();
  }

  /***
   * --------------------------------------------------------------
   * Form Validation
   * --------------------------------------------------------------
   * @method    formValidation    This function build a Login form with validation
   * 
   */
  formValidation() {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  /**
   * --------------------------------------------------------------
   * Login Action
   * --------------------------------------------------------------
   * @method doLogin    Login action just redirect to your home page.
   * 
   * ** You can call any backend API into this function. **
   */
  doLogin() {
    this.navCtrl.setRoot('HomePage');
  }

  /**
   * -------------------------------------------------------------
   * Go to Forget Password Page
   * -------------------------------------------------------------
   */
  goToForgetPasswordPage() {
    this.navCtrl.setRoot('ForgetPasswordPage');
  }

  /**
   * -------------------------------------------------------------
   * Go to Sign Up Page
   * -------------------------------------------------------------
   */
  goToSignUpPage() {
    this.navCtrl.setRoot('SignUpPage');
  }
}
