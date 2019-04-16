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
    ref = firebase.database().ref('chatrooms/');

    constructor(public navCtrl: NavController,
                public modalCtrl: ModalController,
                public navParams: NavParams) {
        let usuario = AuthProvider.getUser();
        console.log(usuario.data.id);
        this.ref
            .orderByChild('comprador_anunciante_id')
            .equalTo(usuario.data.id)
            .on('value', resp => {
                let array2 = snapshotToArray(resp);
                this.rooms = array2.concat(this.rooms);
            });
        this.ref
            .orderByChild('vendedor_anunciante_id')
            .equalTo(usuario.data.id)
            .on('value', resp => {
                let array2 = snapshotToArray(resp);
                this.rooms = array2.concat(this.rooms);
            });
    }

    ionViewDidLoad() {
    }



    abrirChat(sala) {
        this.modalCtrl.create('ConversaPage', {
            key: sala.key,
            roomname: sala.anuncio.titulo,
            nickname: sala.anuncio.anunciante.data.nome_anunciante,
            anuncio: sala.anuncio,
        }).present();
    }
}
