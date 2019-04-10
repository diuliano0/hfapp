import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriaProvider} from "../../../providers/categoria/categoria";
import {Util} from "../../../providers/base/util";

/**
 * Generated class for the AnuncioDadosBasicosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-anuncio-dados-basicos',
    templateUrl: './anuncio-dados-basicos.html',
    providers: [
        CategoriaProvider
    ]
})
export class AnuncioDadosBasicosPage {

    formDadosBasicos: FormGroup;

    categorias;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public viewCtrl: ViewController,
                private categoriaProvider: CategoriaProvider,
                public navParams: NavParams) {
    }

    ngOnInit() {
        this.categoriaProvider.listaCategorias().subscribe(res => {
            this.categorias = res;
        });
        this.formDadosBasicos = this.fb.group({
            "categoria_id": [null, Validators.compose([Validators.required])],
            "titulo": [null, Validators.compose([Validators.required])],
            "tipo": [null, Validators.compose([Validators.required])],
            "quantidade": [null, Validators.compose([Validators.required])],
            "valor": [null, Validators.compose([Validators.required])],
            "descricao": [null, Validators.compose([Validators.required])],
        });
    }

    salvar(value){
        if(!this.formDadosBasicos.invalid){
          if (!Util.isNullOrUndefined(value['categoria_id'])) {
            value['categoria_id'] = this.formDadosBasicos.controls['categoria_id'].value.id;
          }
          this.viewCtrl.dismiss({data: value});
        }
    }
}
