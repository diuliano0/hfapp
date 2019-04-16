import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';
import {snapshotToArray} from "../conversas/conversas";

/**
 * Generated class for the ConversaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-conversa',
    templateUrl: './conversa.html',
})
export class ConversaPage {

    anuncio;

    @ViewChild(Content) content: Content;

    data = { type:'', nickname:'', message:'', anuncio:'' };
    chats = [];
    roomkey:string;
    nickname:string;
    offStatus:boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.anuncio = this.navParams.get('anuncio');
        this.roomkey = this.navParams.get("key") as string;
        this.nickname = this.navParams.get("nickname") as string;
        this.data.type = 'message';
        this.data.nickname = this.nickname;

        this.data.message = '';
        /*let joinData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
        joinData.set({
            type:'join',
            user:this.nickname,
            message:this.nickname+' Iniciou uma conversa com você.',
            sendDate:Date()
        });*/

        firebase.database().ref('chatrooms/'+this.roomkey+'/chats').on('value', resp => {
            this.chats = [];
            this.chats = snapshotToArray(resp);
            setTimeout(() => {
                if(this.offStatus === false) {
                    this.content.scrollToBottom(300);
                }
            }, 1000);
        });
    }

    sendMessage() {

        let newData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
        newData.set({
            type:this.data.type,
            user:this.data.nickname,
            message:this.data.message,
            sendDate:Date()
        });
        this.data.message = '';

    }

    exitChat() {
        let exitData = firebase.database().ref('chatrooms/'+this.roomkey+'/chats').push();
        exitData.set({
            type:'exit',
            user:this.nickname,
            message:this.nickname+' saiu desta conversa.',
            sendDate:Date()
        });

        this.offStatus = true;

        this.navCtrl.setRoot('ConversasPage', {
            nickname:this.nickname
        });
    }

}
