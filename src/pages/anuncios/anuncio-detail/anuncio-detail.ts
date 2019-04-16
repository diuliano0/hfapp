import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";
import {AnuncianteProvider} from "../../../providers/anunciante/anunciante";
import {Util} from "../../../providers/base/util";
import {CallNumber} from "@ionic-native/call-number";
import {AuthProvider} from "../../../providers/auth/auth";
import * as firebase from 'Firebase';

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
        AnuncianteProvider,
        AuthProvider
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

    usuario: any;

    data = { roomname:'', anuncio:'', key:'' };

    ref = firebase.database().ref('chatrooms/');

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private callNumber: CallNumber,
                private auth: AuthProvider,
                private util: Util,
                private anuncianteProvider: AnuncianteProvider,
                public viewCtrl: ViewController,
                public modalCtrl: ModalController,
                public dataProvider: DataProvider) {
        // Get Hotel Details Information
        this.anuncioDetalhe = this.navParams.get('anuncioDetalhe');
        this.usuario = AuthProvider.getUser();
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
        this.callNumber.callNumber(this.anuncioDetalhe.anunciante.data.telefone_anunciante, true)
            .then(res => console.log('Launched dialer!', res))
            .catch(err => console.log('Error launching dialer', err));
        /*window.open(`tel:${this.anuncioDetalhe.anunciante.data.telefone_anunciante}`, '_system');*/
    }

    favoritar(id){
          this.anuncianteProvider.favoritar(id).subscribe(res => {
              this.util.criarAlert('Sucesso!', 'Anúncio Favoritado', 'ok');
          });
    }

    abrirChat(){
        if(!this.autenticado()){
            this.util.criarConfirmacao('', [
                {
                    text: 'voltar',
                    role: 'cancel',
                    handler: () => {}
                },
                {
                    text: 'Logar',
                    handler: () => {
                        this.navCtrl.setRoot('SignInPage');
                    }
                }
            ],'Deseja realizar o login para iniciar o chat?');
            return;
        }

        let sala: any;
        this.ref
            .orderByChild('key')
            .equalTo(this.anuncioDetalhe.id+this.usuario.data.id+this.anuncioDetalhe.anunciante.data.id)
            .limitToLast(1)
            .once('value')
            .then((snapshot)=> {
                sala = snapshot.val();
                if(Util.isNullOrUndefined(sala)){
                    let newData = this.ref.push();
                    newData.set({
                        key:this.anuncioDetalhe.id+this.usuario.data.id+this.anuncioDetalhe.anunciante.data.id,
                        comprador_anunciante_id: this.usuario.data.id,
                        vendedor_anunciante_id: this.anuncioDetalhe.anunciante.data.id,
                        roomname:this.anuncioDetalhe.titulo,
                        anuncio:this.anuncioDetalhe,
                    });

                    this.modalCtrl.create('ConversaPage', {
                        key:newData.key,
                        roomname:this.anuncioDetalhe.titulo,
                        nickname:this.anuncioDetalhe.anunciante.data.nome_anunciante,
                        anuncio:this.anuncioDetalhe,
                    }).present();
                    return;
                }
                snapshot.forEach((data)=> {
                    this.modalCtrl.create('ConversaPage', {
                        key:data.key,
                        roomname:this.anuncioDetalhe.titulo,
                        nickname:this.anuncioDetalhe.anunciante.data.nome_anunciante,
                        anuncio:this.anuncioDetalhe,
                    }).present();
                });

            });
    }

    autenticado(){
        return AuthProvider.autenticado();
    }



}
