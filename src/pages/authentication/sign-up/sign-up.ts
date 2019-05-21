/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 *
 * This File Represent Sign Up Component
 * File path - '../../../src/pages/authentication/sign-up/sign-up'
 */

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import {FormBuilder, Validators} from '@angular/forms';
import {AnuncianteProvider} from "../../../providers/anunciante/anunciante";
import {Util} from "../../../providers/base/util";

@IonicPage()
@Component({
    selector: 'page-sign-up',
    templateUrl: 'sign-up.html',
    providers: [
        AnuncianteProvider,
        Util
    ]
})
export class SignUpPage {

    // Registration Form
    registrationForm: any;

    // Email Validation Regex Patter
    emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";


    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public util: Util,
                public anuncianteProvider: AnuncianteProvider,
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
     * @method    formValidation    This function build a Registration form with validation
     *
     */
    formValidation() {
        this.registrationForm = this.formBuilder.group({
            nome: ['', Validators.compose([Validators.minLength(3), Validators.required])],
            username: [null],
            email: ['', Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
            password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
            password_confirmation: [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            telefone: [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
        });
    }

    /**
     * --------------------------------------------------------------
     * Registration Action
     * --------------------------------------------------------------
     * @method doRegistration    Registration action just redirect to your home page.
     *
     * ** You can call any backend API into this function. **
     */
    doRegistration(value) {
        this.registrationForm.controls['username'].setValue(this.registrationForm.controls['email'].value);
        value = this.registrationForm.value;
        if (!this.registrationForm.invalid) {

            let telefone = value.telefone.split(')');
            telefone[0] = telefone[0].replace('(', '');
            let pessoa = {
                nome: value.nome,
                email: value.email,
                telefones: [{
                    ddd: telefone[0],
                    numero: telefone[1],
                    tipo_telefone: 1,
                }]
            };

            let user = {
                nome: value.nome,
                username: value.username,
                email: value.email,
                password: value.password,
                password_confirmation: value.password,
                status: 1,
            };


            this.anuncianteProvider.create({
                pessoa: pessoa,
                user: user,
                status: 1
            }).subscribe(res => {
                this.util.criarAlert('Sucesso!', 'Conta criada com sucesso', 'ok');
                this.navCtrl.setRoot('SignInPage');
            });

        }
    }

    phoneMask(value, self) {
        self.value = Util.dddPhoneMask(value, self);
    }

    /**
     * --------------------------------------------------------------
     * Go To Login Page
     * --------------------------------------------------------------
     * @method goToLoginPage    This action button just redirect to your login page.
     */
    goToLoginPage() {
        this.navCtrl.setRoot('SignInPage');
    }
}
