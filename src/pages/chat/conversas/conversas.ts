import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';
import {AuthProvider} from "../../../providers/auth/auth";

export const snapshotToArray = snapshot => {
    let returnArr = [];

    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};

@IonicPage()
@Component({
    selector: 'page-conversas',
    templateUrl: './conversas.html',
})
export class ConversasPage {

    rooms = [];
    rooms_i = [];
    ref = firebase.database().ref('chatrooms/');
    usuario;
    options = 'Minhas conversas';

    constructor(public navCtrl: NavController,
                public modalCtrl: ModalController,
                public navParams: NavParams) {
        this.usuario = AuthProvider.getUser();
        this.ref
            .orderByChild('comprador_anunciante_id')
            .equalTo(this.usuario.data.id)
            .on('value', resp => {
                this.rooms = [];
                this.rooms = snapshotToArray(resp).reverse();
            });
        this.ref
            .orderByChild('vendedor_anunciante_id')
            .equalTo(this.usuario.data.id)
            .on('value', resp => {
                this.rooms_i = [];
                this.rooms_i = snapshotToArray(resp).reverse();
            });
    }

    ionViewDidLoad() {
        this.options = 'Minhas conversas';
    }



    abrirChat(sala) {
        this.modalCtrl.create('ConversaPage', {
            key: sala.key,
            roomname: sala.anuncio.titulo,
            nickname: this.usuario.data.nome_anunciante,
            anuncio: sala.anuncio,
        }).present();
    }
}
