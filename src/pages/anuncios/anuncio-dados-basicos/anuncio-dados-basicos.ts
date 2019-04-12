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

    categoria_selected;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public viewCtrl: ViewController,
                private categoriaProvider: CategoriaProvider,
                public navParams: NavParams) {
    }

    ngOnInit() {
        this.formDadosBasicos = this.fb.group({
            "id": [null],
            "categoria_id": [null, Validators.compose([Validators.required])],
            "titulo": [null, Validators.compose([Validators.required])],
            "tipo": [null, Validators.compose([Validators.required])],
            "quantidade": [null, Validators.compose([Validators.required])],
            "valor": [null, Validators.compose([Validators.required])],
            "descricao": [null, Validators.compose([Validators.required])],
        });

        let anuncio = this.navParams.get("info");
        if(!Util.isNullOrUndefined(anuncio)){
            this.formDadosBasicos.patchValue(anuncio);
        }

        this.categoriaProvider.listaCategorias().subscribe(res => {
            this.categorias = res;
            if(!Util.isNullOrUndefined(anuncio)){
                let teste = this.categorias.data.filter(cat=> cat.id == anuncio.categoria_id)[0];
                this.categoria_selected = teste;
                this.formDadosBasicos.controls['categoria_id'].setValue(teste);
            }
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
