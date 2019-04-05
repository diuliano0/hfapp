import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NavController, NavParams} from "ionic-angular";
import {Util} from "../../../providers/base/util";
import {AnuncianteProvider} from "../../../providers/anunciante/anunciante";
import {AuthProvider} from "../../../providers/auth/auth";

@Component({
  selector: 'user-information',
  templateUrl: 'user-information.html',
  providers:[
    AuthProvider
  ]
})
export class UserInformationComponent {

  // Registration Form
  registrationForm: any;

  anunciante: any;

  // Email Validation Regex Patter
  emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: Util,
              public authProvider: AuthProvider,
              public anuncianteProvider: AnuncianteProvider,
              private formBuilder: FormBuilder) {
    this.anunciante = AuthProvider.getUser();
  }

  /** Do any initialization */
  ngOnInit() {
    this.formValidation();
  }

  formValidation() {
    this.registrationForm = this.formBuilder.group({
      nome: [this.anunciante.data.nome_anunciante, Validators.compose([Validators.minLength(6), Validators.required])],
      email: [this.anunciante.data.email_anunciante, Validators.compose([Validators.pattern(this.emailPattern), Validators.required])],
      telefone: [this.anunciante.data.telefone_anunciante, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
    });
  }

  alterarDados(value) {
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



      this.anuncianteProvider.update({
        pessoa: pessoa,
        include:'pessoa.telefone,anexo,pessoa.endereco,usuario',
        status: 1
      }).subscribe(res => {
        AuthProvider.setUser(res);
        this.anunciante = res;
        this.util.criarAlert('Sucesso!', 'Conta atualizada com sucesso', 'ok');
      });

    }
  }

  phoneMask(value, self) {
    self.value = Util.dddPhoneMask(value, self);
  }

}

