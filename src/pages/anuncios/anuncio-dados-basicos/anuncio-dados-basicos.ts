import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoriaProvider} from "../../../providers/categoria/categoria";

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

    /*filtro(ev) {
        let text = ev.text;
        if (text.length == 0) {
            this.categoriaProvider.listaCategorias().subscribe(res => {
                this.categorias = res;

            });
        }
        if (text.length > 1) {
            this.categoriaProvider.listaCategorias(text).subscribe(res => {
                this.categorias = res;

            });
        }
    }*/
    salvar(value){
        if(!this.formDadosBasicos.invalid){

        }
    }
}
