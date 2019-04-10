import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnderecoProvider} from "../../../providers/endereco/endereco";
import {Util} from "../../../providers/base/util";

@IonicPage()
@Component({
    selector: 'page-anuncio-endereco',
    templateUrl: './anuncio-endereco.html',
    providers: [
        Util
    ]
})
export class AnuncioEnderecoPage {

    enderecoForm: FormGroup;

    cepMask;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public util: Util,
                public enderecoProvider: EnderecoProvider,
                public viewCtrl: ViewController,
                public navParams: NavParams) {
    }

    ngOnInit() {
        this.cepMask = Util.cepMasc();
        this.enderecoForm = this.fb.group({
            'logradouro': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'cep': [null, Validators.compose([Validators.required, Validators.maxLength(255)])],
            'numero': [null, Validators.compose([Validators.maxLength(255)])],
            'cidade_nome': [null, Validators.compose([Validators.maxLength(255)])],
            'estado_nome': [null, Validators.compose([Validators.maxLength(255)])],
            'complemento': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'cidade_id': [null, Validators.compose([Validators.required])],
            'bairro_id': [null],
            'bairro': [null],
            'id': [null],
            'tipo_endereco': [0, Validators.compose([Validators.required, Validators.maxLength(255)])],
        });
    }

    localizaCep() {
        let load = this.util.createLoading('Buscando...');
        let cep = this.enderecoForm.controls['cep'].value;
        this.enderecoProvider
            .pesquisarCep(cep)
            .subscribe((e: any) => {
                this.enderecoForm.controls['logradouro'].setValue(e.data.logradouro);
                this.enderecoForm.controls['cidade_id'].setValue(e.data.cidade_id);
                this.enderecoForm.controls['bairro_id'].setValue(e.data.bairro_id);
                this.enderecoForm.controls['cidade_nome'].setValue(e.data.cidade_nome);
                this.enderecoForm.controls['estado_nome'].setValue(e.data.estado_nome);
                load.dismiss();
            });
    }

    salvar(value){
        if(!this.enderecoForm.invalid){
            this.viewCtrl.dismiss({data: value});
        }
    }
}
