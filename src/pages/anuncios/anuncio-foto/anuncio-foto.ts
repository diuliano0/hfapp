import {Component} from '@angular/core';
import {
    AlertController, IonicPage, NavController, NavParams, Platform, PopoverController,
    ViewController
} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Util} from "../../../providers/base/util";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {DomSanitizer} from "@angular/platform-browser";
import {AnuncioProvider} from "../../../providers/anuncio/anuncio";

/**
 * Generated class for the AnuncioFotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-anuncio-foto',
    templateUrl: 'anuncio-foto.html',
    providers: [
        [Camera],
        Util,
        AnuncioProvider
    ]
})
export class AnuncioFotoPage {

    private customForm: FormGroup;
    private mPopover = null;

    immobleModel = {
        slug: null,
        id: null,
    };

    photos = [];
    photosSave = [];

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                private platform: Platform,
                private fb: FormBuilder,
                private anuncioProvider: AnuncioProvider,
                public loadingCtrl: Util,
                private popoverCtrl: PopoverController,
                private camera: Camera,
                public viewCtrl: ViewController,
                private DomSanitizer: DomSanitizer) {
        if (this.navParams.get("info") != null
            && (this.navParams.get("info")).id != null) {
            this.immobleModel.id = (this.navParams.get("info")).id;
        }


    }

    presentPopover(myEvent) {
        this.mPopover = this.popoverCtrl.create('AnuncioFotoOpcoesPage', {
            actions: [
                {
                    title: 'Câmera',
                    icon: 'camera',
                    callback: () => {
                        this.takePictureAction();
                    }
                },
                {
                    title: 'Galeria',
                    icon: 'image',
                    callback: () => {
                        this.galeryPictureAction();
                    }
                }
            ]
        });

        this.mPopover.present({
            ev: myEvent
        });
    }

    ionViewDidEnter() {
        this.platform.registerBackButtonAction(() => {
            this.viewCtrl.dismiss();
        });
    }

    takePictureAction() {
        this.mPopover.dismiss();

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
            allowEdit: false,
        };

        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;

            console.log(`Imagem path: ${base64Image}`)

            this.photos.push(base64Image);
            this.photosSave.push(imageData);
        }, (err) => {
            console.log(err)
        });
    }

    galeryPictureAction() {
        this.mPopover.dismiss();

        let cameraOptions = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            quality: 80,
            targetWidth: 700,
            targetHeight: 700,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
            saveToPhotoAlbum: false,
            allowEdit: false,
        };

        this.camera.getPicture(cameraOptions)
            .then(imageData => {
                    let base64Image = 'data:image/jpeg;base64,' + imageData;
                    this.photos.push(base64Image);
                    this.photosSave.push(imageData);
                },
                err => console.log(err));
    }

    removeImage(index) {
        if (this.photos.length > 0) {
            this.photos.splice(index, 1)
        }
    }

    salvar(model) {

        let loadingModalLogradouro = this.loadingCtrl.createLoading('Enviando imagens...');

        this.customForm = this.fb.group({
            'conteudo': [this.photos],
        });

        this.anuncioProvider.updaloadImage( this.immobleModel.id,this.customForm.value).subscribe(res => {
            loadingModalLogradouro.dismiss();
            this.viewCtrl.dismiss();
        }, error2 => {
            loadingModalLogradouro.dismiss();
        });

        /*this.usuariosProvider.uploadImageUser(
         this.customForm.value,
         this.immobleModel.id).subscribe(result => {
         loadingModalLogradouro.dismiss();
         this.viewCtrl.dismiss();
         }, error => {
         loadingModalLogradouro.dismiss();
         this.usuariosProvider.handleError(error, this.alertCtrl)
         })*/
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
