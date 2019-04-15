import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let usuario = AuthProvider.getUser();
    this.ref
        .orderByChild('anunciante_id')
        .equalTo(usuario.data.id)
        .on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
  }

  ionViewDidLoad() {}

}
