/**
 * @author    ThemesBuckets <themebucketbd@gmail.com>
 * @copyright Copyright (c) 2018
 * @license   Fulcrumy
 *
 * This File Represent Profile Page Component
 * File path - '../../src/pages/profile/profile'
 */

import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {Util} from "../../providers/base/util";
import {AnuncianteProvider} from "../../providers/anunciante/anunciante";
import {AuthProvider} from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [[Camera], Util, AnuncianteProvider]
})
export class ProfilePage {

  // Segment Options
  options: any = 'User Info';
  username;
  usuario;
  imageUrl = 'assets/imgs/avatar.png';

  constructor(public navCtrl: NavController,
              private camera: Camera,
              private anunciante: AnuncianteProvider,
              private util: Util,
              public navParams: NavParams) {
    this.loadUser();
  }

  ngOnInit() {

  }

  loadUser(){
    let user = AuthProvider.getUser();
    this.usuario = user;
    this.username = user.data.usuario.data.username;
    if(this.usuario.data.hasOwnProperty('anexo')){
      this.imageUrl = this.usuario.data.anexo.data.url;
    }
  }

  cameraInit() {

    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      quality: 80,
      targetWidth: 700,
      targetHeight: 700,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      allowEdit: true,
    };
    let load = this.util.createLoading('Alterando...');
    this.camera.getPicture(options).then((imageData) => {
      let imagem = 'data:image/jpeg;base64,' + imageData;
      this.anunciante.mudarImagem({
        anexo: {
          'nome': 'perfil' + this.username,
          'alias': 'perfil' + this.username,
          'conteudo': imagem,
          'extensao': 'image/jpeg',
        }
      }).subscribe(res => {
        this.imageUrl = imagem;
        this.reloadAnunciante();
        load.dismiss();
      });
    }, (err) => {
      console.log(err);
      load.dismiss();
    });
  }

  reloadAnunciante(){
    this.anunciante.perfil({
      include:'pessoa.telefone,anexo,pessoa.endereco,usuario',
    }).subscribe(res => {
      AuthProvider.setUser(res);
    });
  }

  abrirOpcoes() {
    this.util.criarActionSheet('Ações', [
      {
        text: 'Câmera',
        icon: 'ios-camera',
        cssClass: 'yellow-color',
        handler: () => {
          this.cameraInit();
        }
      },
      {
        text: 'Arquivo',
        icon: 'ios-folder',
        cssClass: 'yellow-color',
        handler: () => {
          this.galeryPictureAction();
        }
      },
      {
        text: 'Voltar',
        icon: 'ios-undo-outline',
        handler: () => {
        }
      }
    ]);
  }

  galeryPictureAction() {

    let cameraOptions: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      quality: 80,
      targetWidth: 700,
      targetHeight: 700,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      saveToPhotoAlbum: false,
      allowEdit: true,
    };
    let load = this.util.createLoading('Alterando...');
    this.camera.getPicture(cameraOptions)
      .then(imageData => {
          let imagem = 'data:image/jpeg;base64,' + imageData;

          this.anunciante.mudarImagem({
            anexo: {
              'nome': 'perfil' + this.username,
              'alias': 'perfil' + this.username,
              'conteudo': imagem,
              'extensao': 'image/jpeg',
            }
          }).subscribe(res => {
            this.imageUrl = imagem;
            this.reloadAnunciante();
            load.dismiss();
          });
        },
        err => {
          load.dismiss();
        });
  }
}
