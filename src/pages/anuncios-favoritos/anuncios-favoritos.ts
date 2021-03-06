import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AnuncioProvider} from "../../providers/anuncio/anuncio";
import {Util} from "../../providers/base/util";
import {Subscription} from "rxjs/Subscription";
import {DataProvider} from "../../providers/data/data";
import {AnuncianteProvider} from "../../providers/anunciante/anunciante";

/**
 * Generated class for the AnunciosFavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-anuncios-favoritos',
    templateUrl: 'anuncios-favoritos.html',
    providers: [
        AnuncioProvider,
        AnuncianteProvider,
        Util
    ]
})
export class AnunciosFavoritosPage {

    // Array List of Hotels
    items: any = [];
    consulta;
    private _nextPage: string = null;

    private _requestNextPageBusca: Subscription;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public anuncio: AnuncioProvider,
                public anunciante: AnuncianteProvider,
                public util: Util,
                public viewCtrl: ViewController,
                public modalCtrl: ModalController,
                public dataProvider: DataProvider) {

    }

    /** Do any initialization */
    ngOnInit() {
        this.consulta = this.navParams.get('consulta');
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
        let load = this.util.createLoading('Listando...');
        this.anuncio.favotiros({
            consulta: JSON.stringify(this.consulta),
            include: 'anexo,enderecos,anunciante.pessoa.telefones'
        }).subscribe(res => {
            this.items = res;
            load.dismiss();
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
        this.anuncio.favotiros({
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
                        this.items.push(i);
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

    abrirOpcoes(item) {
        this.util.criarActionSheet('Ações', [
            {
                text: 'Remover',
                icon: 'ios-close-circle-outline',
                cssClass: 'yellow-color',
                handler: () => {
                    this.remover(item);
                }
            },
            {
                text: 'Voltar',
                icon: 'ios-undo-outline',
                handler: () => {

                }
            }
        ]);
    }

    remover(item) {
        this.anunciante.desfavoritar(item.id).subscribe(res=>{
            this.getHotelList();
        });
    }
}
