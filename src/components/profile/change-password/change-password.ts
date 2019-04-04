import {Component} from '@angular/core';
import {UsuarioProvider} from "../../../providers/usuario/usuario";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Util} from "../../../providers/base/util";

@Component({
    selector: 'change-password',
    templateUrl: 'change-password.html',
    providers: [
        UsuarioProvider,
        Util,
    ]
})
export class ChangePasswordComponent {

    senhaForm: FormGroup;

    constructor(private usuarioProvider: UsuarioProvider,
                private util: Util,
                private fb: FormBuilder,) {
    }

    ngOnInit() {
        this.senhaForm = this.fb.group({
            'old_password': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            'new_password': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
            'new_password_confirmation': [null, Validators.compose([Validators.minLength(6), Validators.maxLength(255), Validators.required])],
        });
    }

    alterarSenha(value) {
        if(!this.senhaForm.invalid){
            let laoding = this.util.createLoading('Alterando..');
            this.usuarioProvider.alterarSenha(value).subscribe(res=>{
                this.util.criarAlert('sucesso!', 'Senha alterada.','ok');
                this.senhaForm.reset();
                laoding.dismiss();
            });
        }
    }

}
