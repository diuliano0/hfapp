import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {AnuncioProvider} from "../../../providers/anuncio/anuncio";
import {Util} from "../../../providers/base/util";

/**
 * Generated class for the AnuncioCreatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncio-create',
  templateUrl: './anuncio-create.html',
})
export class AnuncioCreatePage {

  checkedBasic = false;
  checkedLocation = false;
  checkedInfo = false;
  checkedDescription = false;
  checkedPhoto = false;
  checkedPayment = false;
  checkedReadCreate = false;
  checkedReadPublished = false;
  anuncio;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public util: Util,
              public anuncioProvider: AnuncioProvider,
              public modalCtrl: ModalController) {
  }

  ngOnInit() {
  }

  segueToPropertyBasicPage() {
    if (!this.checkedReadPublished) {
      let modal = this.modalCtrl.create('AnuncioDadosBasicosPage', {info: this.anuncio});
      modal.onDidDismiss(data => {
        if (data != null && data.data != null) {
          this.anuncio = data.data;
          this.checkedBasic = true;
        }
      });
      modal.present();
    }
  }

  segueToPropertyLocationPage() {
    if (!this.checkedReadPublished) {
      let modal = this.modalCtrl.create('AnuncioEnderecoPage', {info: this.anuncio});
      modal.onDidDismiss(data => {
        if (data != null && data.data != null) {
          this.anuncio.enderecos = [data.data];
          this.checkedLocation = true;
        }
      });
      modal.present();
    }
  }

  checkPhotoEnabled(): boolean {
    if (this.checkedBasic
        && this.checkedLocation) {
      return true;
    } else {
      return false
    }
  }

  dismiss(){
    this.navCtrl.setRoot('MeusAnunciosPage');
  }

  salvar() {
    let load = this.util.createLoading('Salvando');
    if (!this.checkedReadCreate) {
      this.anuncioProvider.create(this.anuncio).subscribe((res: any) =>{
        this.anuncio.id = res.data.id;
        this.checkedReadPublished = true
        load.dismiss();
      }, error=>{
        load.dismiss();
      });
    }
  }

  segueToPropertyCreatePhotoPage() {
    if (this.checkedReadPublished) {
      let modal = this.modalCtrl.create('AnuncioFotoPage', {info: this.anuncio});
      modal.onDidDismiss(data => {
        this.checkedPhoto = true;
      });
      modal.present();
    }
  }

}
