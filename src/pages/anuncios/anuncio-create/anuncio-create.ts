import { Component } from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';

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
  immobleModel;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {

  }

  segueToPropertyBasicPage() {
    if (!this.checkedReadPublished) {
      let modal = this.modalCtrl.create('AnuncioDadosBasicosPage', {info: this.immobleModel});
      modal.onDidDismiss(data => {
        if (data != null && data.info != null) {
          let result = data.info;
          this.checkedBasic = true;
          //this.changeDatatoSave(result)
        }
      });
      modal.present();
    }
  }

  checkPhotoEnabled(): boolean {
    if (this.checkedBasic
        && this.checkedDescription
        && this.checkedInfo
        && this.checkedLocation) {
      return true;
    } else {
      return false
    }
  }
}
