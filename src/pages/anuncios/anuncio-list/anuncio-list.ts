import {Component} from '@angular/core';
import {
    IonicPage, MenuController, ModalController, NavController, NavParams,
    ViewController
} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";
import {AnuncioProvider} from "../../../providers/anuncio/anuncio";
import {Subscription} from "rxjs/Subscription";
import {Util} from "../../../providers/base/util";

/**
 * Generated class for the AnuncioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-anuncio-list',
    templateUrl: './anuncio-list.html',
    providers: [
        AnuncioProvider,
        Util
    ]
})
export class AnuncioListPage {


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
                public dataProvider: DataProvider,
                public menuCtrl: MenuController) {
        this.menuCtrl.enable(true);

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
        this.anuncio.list({
            consulta:JSON.stringify(this.consulta),
            include:'anexo,enderecos,anunciante.pessoa.telefones'
        }).subscribe(res=>{
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

    procedimentoRefresh(refresher){
        let load = this.util.createLoading('Listando...');
        this.anuncio.list({
            include:'anexo,enderecos,anunciante.pessoa.telefones'
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

}
