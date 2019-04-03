import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CategoriaProvider} from "../../providers/categoria/categoria";
import {Util} from "../../providers/base/util";

/**
 * Generated class for the FiltroAnuncioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtro-anuncio',
  templateUrl: 'filtro-anuncio.html',
  providers: [
    CategoriaProvider
  ]
})
export class FiltroAnuncioPage {

  pesquisaForm: FormGroup;
  categorias = [];

  constructor(public navCtrl: NavController,
              private fb: FormBuilder,
              private categoriaProvider: CategoriaProvider,
              public navParams: NavParams) {
  }

  ngOnInit() {
    this.categoriaProvider.listaCategorias().subscribe(res => {
      this.categorias = res;
    });
    this.pesquisaForm = this.fb.group({
      'anuncio.anuncios.titulo': [null],
      'anuncio.anuncios.tipo': [null],
      'anuncio.anuncios.categoria_id': [null],
      'anuncio.anuncios.valor_de': [null],
      'anuncio.anuncios.valor_ate': [null],
    });
  }

  ionViewDidLoad() {


  }

  filtro(ev) {
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
  }

  pesquisar() {
    let items = Object.assign({}, this.pesquisaForm.value);
    if (!Util.isNullOrUndefined(items['anuncio.anuncios.valor_de'])) {
      items['anuncio.anuncios.valor'] = items['anuncio.anuncios.valor_de'] + ';' + items['anuncio.anuncios.valor_ate'];
    }
    if (!Util.isNullOrUndefined(items['anuncio.anuncios.categoria_id'])) {
      items['anuncio.anuncios.categoria_id'] = this.pesquisaForm.controls['anuncio.anuncios.categoria_id'].value.id;
    }
    let consulta = {
      filtro: items,
      order: 'created_at;desc'
    };
    this.navCtrl.setRoot('AnuncioListPage', {
      consulta
    });
  }

}
