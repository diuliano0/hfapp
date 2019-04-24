import {Component} from '@angular/core';
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
    anuncio: any = {};

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public util: Util,
                public anuncioProvider: AnuncioProvider,
                public modalCtrl: ModalController) {
    }

    ngOnInit() {
        let anuncio = this.navParams.get("info");
        if (!Util.isNullOrUndefined(anuncio)) {
            this.anuncio = {
                "id": anuncio.id,
                "categoria_id": anuncio.categoria_id,
                "anexo": ( anuncio.hasOwnProperty('anexo')) ? anuncio.anexo : null,
                "titulo": anuncio.titulo,
                "tipo": anuncio.tipo,
                "quantidade": anuncio.quantidade,
                "valor": anuncio.valor,
                "descricao": anuncio.descricao,
                "lng": anuncio.lng,
                "lat": anuncio.lat,
                "enderecos": [{
                    'logradouro': anuncio.enderecos.data[0].logradouro,
                    'cep': anuncio.enderecos.data[0].cep,
                    'numero': anuncio.enderecos.data[0].numero,
                    'cidade_nome': anuncio.enderecos.data[0].cidade_nome,
                    'estado_nome': anuncio.enderecos.data[0].estado_uf,
                    'complemento': anuncio.enderecos.data[0].complemento,
                    'cidade_id': anuncio.enderecos.data[0].cidade_id,
                    'bairro_id': anuncio.enderecos.data[0].bairro_id,
                    'bairro': null,
                    'id': anuncio.enderecos.data[0].id,
                    'tipo_endereco': 0,
                }]
            };
        }
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
                    if(data.data.hasOwnProperty('lat')){
                        this.anuncio['lat'] = data.data.lat;
                        this.anuncio['lng'] = data.data.lng;
                    }
                    this.anuncio['enderecos'] = [data.data];
                    debugger;
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

    checkEnableEdit(){
        return !Util.isNullOrUndefined(this.anuncio)&& this.anuncio.hasOwnProperty('id') && !Util.isNullOrUndefined(this.anuncio.id) ;
    }

    dismiss() {
        this.navCtrl.setRoot('MeusAnunciosPage');
    }

    salvar() {
        if (!this.checkedReadCreate) {
            if(!this.checkEnableEdit()){
                let load = this.util.createLoading('Salvando');
                this.anuncioProvider.create(this.anuncio).subscribe((res: any) => {
                    this.anuncio.id = res.data.id;
                    this.checkedReadPublished = true
                    load.dismiss();
                }, error => {
                    load.dismiss();
                });
            }else{
                this.publicar();
            }
        }
    }

    publicar() {
        this.checkedReadPublished = true
        let load = this.util.createLoading('Publicando');
        this.anuncioProvider.update(this.anuncio.id, this.anuncio).subscribe((res: any) => {
            this.checkedReadPublished = true
            load.dismiss();
            this.dismiss();
        }, error => {
            load.dismiss();
        });
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
