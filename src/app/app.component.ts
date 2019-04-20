/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 *
 * File path - '../../src/app/app.component'
 */

import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
import {DataProvider} from '../providers/data/data';
import {ANUNCIO_ROUTE_LIST} from "../pages/anuncios/conts.conts";
import {AuthProvider} from "../providers/auth/auth";
import {Util} from "../providers/base/util";
import * as firebase from "firebase";
import {UniqueDeviceID} from "@ionic-native/unique-device-id";
import {FCM as FCMPlugin} from "@ionic-native/fcm";

const config = {
    apiKey: 'AIzaSyBXkcMYOlNhEoLETg9QBfmGnyOYX5tcJ5Q',
    authDomain: 'hortifruti-95eb8.firebaseapp.com',
    databaseURL: 'https://hortifruti-95eb8.firebaseio.com',
    projectId: 'hortifruti-95eb8',
    storageBucket: 'hortifruti-95eb8.appspot.com',
    messagingSenderId: "556662196462"
};

@Component({
    templateUrl: 'app.html',
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;

    // Root Page of Application
    rootPage: any = ANUNCIO_ROUTE_LIST;

    // Side Menu Pages
    pages: any;

    anunciante: any;

    // Selected Side Menu
    selectedMenu: any;

    imageUrl = 'assets/imgs/avatar.png';

    constructor(public platform: Platform,
                public statusBar: StatusBar,
                private uniqueDeviceID: UniqueDeviceID,
                private fcm: FCMPlugin,
                public splashScreen: SplashScreen,
                public menuCtrl: MenuController,
                public translateService: TranslateService,
                public dataProvider: DataProvider) {
        this.initializeApp();

        // Set Default Language
        translateService.setDefaultLang('pt');

        this.anunciante = AuthProvider.getUser();


        if(!Util.isNullOrUndefined(this.anunciante) && this.anunciante.data.hasOwnProperty('anexo')){
            this.imageUrl = this.anunciante.data.anexo.data.url;
        }
        // Get List of Side Menu Data
        this.getSideMenuData();
        firebase.initializeApp(config);
        this.uniqueDeviceID.get()
            .then((uuid: any) => AuthProvider.setDeviceUUID(uuid))
            .catch((error: any) => console.log(error));
        this.fcm.getToken().then(token => AuthProvider.setFCMToken(token));
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    /**
     * Get Menu Data from Service of `DataProvider`
     * You get `DataProvider` Service at - 'src/providers/data/data';
     */
    getSideMenuData() {
        this.pages = (AuthProvider.autenticado()) ? this.dataProvider.getSideMenusAuth() : this.dataProvider.getSideMenus();
    }

    /**
     * Open Selected Page
     * @param component
     * @param index
     */
    openPage(component, index) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (component) {
            this.nav.setRoot(component);
            this.menuCtrl.close();
        } else {
            if (this.selectedMenu) {
                this.selectedMenu = 0;
            } else {
                this.selectedMenu = index;
            }
        }
    }

    // Logout
    logout() {
        AuthProvider.deslogar();
        this.getSideMenuData();
        this.nav.setRoot(ANUNCIO_ROUTE_LIST);
    }

    entrar() {
        this.nav.setRoot('SignInPage');
    }

    isAutenticado() {
        this.anunciante = AuthProvider.getUser();
        this.getSideMenuData();
        return AuthProvider.autenticado();
    }
}
