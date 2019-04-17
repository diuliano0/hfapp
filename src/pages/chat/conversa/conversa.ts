import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, NavController, NavParams} from 'ionic-angular';
import * as firebase from 'Firebase';
import {snapshotToArray} from "../conversas/conversas";
import {Util} from "../../../providers/base/util";
import {HttpClient} from "@angular/common/http";
import {AuthProvider} from "../../../providers/auth/auth";

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
    roomname;

    constructor(
        public navCtrl: NavController,
        public http: HttpClient,
        public navParams: NavParams) {
        this.anuncio = this.navParams.get('anuncio');
        this.roomname = this.navParams.get('roomname');
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
                if(this.offStatus === false && !Util.isNullOrUndefined(this.content)) {
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
        this.envoieNotif();

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
    envoieNotif() {

        let headers = new Headers({ 'Authorization': 'Bearer '+AuthProvider.getFCMToken(), 'Content-Type': 'application/json' });
        let options = { headers: headers };
        let notification = {
            "notification": {
                "title": "Titre",
                "body": "body",
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "sound": "default"
            }, "data": {
                //OPTIONAL PARAMS
            },
            "to": AuthProvider.getDeviceUUID(),
            "priority": "high"
        };
        let url = 'https://fcm.googleapis.com/fcm/send';
        this.http.post(url, notification, options).subscribe(res=>{});
        console.log("remarche stp")

    }
}
