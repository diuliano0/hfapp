import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";
import {CallNumber} from '@ionic-native/call-number/ngx';
import {AnuncianteProvider} from "../../../providers/anunciante/anunciante";
import {Util} from "../../../providers/base/util";

/**
 * Generated class for the AnuncioDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-anuncio-detail',
    templateUrl: './anuncio-detail.html',
    providers:[
        CallNumber,
        Util,
        AnuncianteProvider
    ]
})
export class AnuncioDetailPage {

    // Check In Date
    checkInDate: any;

    // Check Out Date
    checkOutDate: any;

    // Array List of Hotels
    hotels: any = [];
    anuncioDetalhe: any;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private callNumber: CallNumber,
                private util: Util,
                private anuncianteProvider: AnuncianteProvider,
                public viewCtrl: ViewController,
                public modalCtrl: ModalController,
                public dataProvider: DataProvider) {
        // Get Hotel Details Information
        this.anuncioDetalhe = this.navParams.get('anuncioDetalhe');
        // Current Time For CheckIn (Demo)
        this.checkInDate = new Date();
        // Add 5 days more for Check Out time
        this.checkOutDate = new Date().setTime(new Date().getTime() - (24 * 60 * 60 * 1000) * 5);
    }

    /**
     * Open Location Map
     */
    openLocationMap() {
        this.modalCtrl.create('LocationMapPage', {address: this.anuncioDetalhe.enderecos.data[0].logradouro + ', ' + this.anuncioDetalhe.enderecos.data[0].cidade_nome + ', ' + this.anuncioDetalhe.enderecos.data[0].estado_uf}).present();
    }

    chamar() {
        window.open(`tel:${this.anuncioDetalhe.anunciante.data.telefone_anunciante}`, '_system');
    }

    favoritar(id){
          this.anuncianteProvider.favoritar(id).subscribe(res => {
              this.util.criarAlert('Sucesso!', 'Anúncio Favoritado', 'ok');
          });
    }

}
