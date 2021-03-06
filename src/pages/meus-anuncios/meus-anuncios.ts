import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AnuncioProvider} from "../../providers/anuncio/anuncio";
import {Util} from "../../providers/base/util";
import {Subscription} from "rxjs/Subscription";
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the MeusAnunciosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meus-anuncios',
  templateUrl: 'meus-anuncios.html',
  providers: [
    AnuncioProvider,
    Util
  ]
})
export class MeusAnunciosPage {

  // Array List of Hotels
  items: any = [];
  consulta;
  private _nextPage: string = null;

  private _requestNextPageBusca: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public anuncio: AnuncioProvider,
              public util: Util,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public dataProvider: DataProvider) {

  }

  /** Do any initialization */
  ngOnInit() {
    this.consulta = {filtro: {},order: 'created_at;desc'};
    this.getHotelList();
  }

  /**
   * -----------------------------------------------------------
   * Get List of Hotel
   * -----------------------------------------------------------
   * From Data Provider Service Call `getHotels` method that Give You List of Hotel
   *
   * You get `DataProvider` Service at - 'src/providers/data/data';
   */
  getHotelList() {
    this.anuncio.anuncioByPerfil({
      consulta: JSON.stringify(this.consulta),
      include: 'anexo,enderecos,anunciante.pessoa.telefones'
    }).subscribe(res => {
      //debugger;
      this.items = res;
    });
  }

  /**
   * Open Hotel Details Page
   */
  viewDetails(anuncio) {
    this.modalCtrl.create('AnuncioDetailPage', {anuncioDetalhe: anuncio}).present();
  }

  /**
   * Dismiss function
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

  procedimentoRefresh(refresher) {
    let load = this.util.createLoading('Listando...');
    this.anuncio.anuncioByPerfil({
      consulta: JSON.stringify(this.consulta),
      include: 'anexo,enderecos,anunciante.pessoa.telefones'
    }).subscribe((res: any) => {
      this.items = res;
      this._nextPage = res.meta.pagination.links.next;
      load.dismiss();
      refresher.complete();
    });
  }

  doInfinite(infiniteScroll) {
    if (this._nextPage != null) {

      this._requestNextPageBusca = this.anuncio.nextPage(this._nextPage)
        .subscribe(items => {

          for (let i of items.data) {
            this.items.data.push(i);
          }

          this._nextPage = items.meta.pagination.links.next;

          infiniteScroll.complete();
        }, error => {
          infiniteScroll.complete();
        });
    } else {
      infiniteScroll.complete();
    }
  }

  openAnunciar() {
    this.navCtrl.setRoot('AnuncioCreatePage');
  }

  editar(item) {
    let modal = this.modalCtrl.create('AnuncioCreatePage', {info: item});
    modal.onDidDismiss(data => {
      this.getHotelList();
    });
    modal.present();
  }

  remover(item) {

  }

  abrirOpcoes(item) {

    this.util.criarActionSheet('Ações', [
      {
        text: 'Editar',
        icon: 'ios-create',
        cssClass: 'yellow-color',
        handler: () => {
          this.editar(item);
        }
      },
      {
        text: 'Fotos',
        icon: 'ios-images',
        cssClass: 'yellow-color',
        handler: () => {
          this.editarFotos(item);
        }
      },
      /*{
        text: 'Remover',
        icon: 'ios-close-circle-outline',
        cssClass: 'yellow-color',
        handler: () => {
          this.remover(item);
        }
      },*/
      {
        text: 'Voltar',
        icon: 'ios-undo-outline',
        handler: () => {

        }
      }
    ]);

  }

  editarFotos(item) {
    let modal = this.modalCtrl.create('AnuncioFotoPage', {info: item});
    modal.onDidDismiss(data => {
      this.getHotelList();
    });
    modal.present();
  }

}
