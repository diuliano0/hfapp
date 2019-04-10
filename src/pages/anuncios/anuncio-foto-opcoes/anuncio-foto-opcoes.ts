import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the AnuncioFotoOpcoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncio-foto-opcoes',
  templateUrl: './anuncio-foto-opcoes.html',
})
export class AnuncioFotoOpcoesPage {

  actions: any;

  constructor(public viewCtrl: ViewController,
              private navParams: NavParams) {
    this.actions = navParams.data.actions;
  }
}
