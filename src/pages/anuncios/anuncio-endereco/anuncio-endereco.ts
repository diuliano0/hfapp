import {Component} from '@angular/core';
import {IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnderecoProvider} from "../../../providers/endereco/endereco";
import {Util} from "../../../providers/base/util";
import {Geolocation} from "@ionic-native/geolocation";

@IonicPage()
@Component({
    selector: 'page-anuncio-endereco',
    templateUrl: './anuncio-endereco.html',
    providers: [
        Util,
        Geolocation
    ]
})
export class AnuncioEnderecoPage {

    enderecoForm: FormGroup;

    cepMask;

    geoCidade;

    cidades;

    estados;

    geoEstado;

    constructor(public navCtrl: NavController,
                public fb: FormBuilder,
                public modalCtrl: ModalController,
                public util: Util,
                private geolocation: Geolocation,
                public enderecoProvider: EnderecoProvider,
                public viewCtrl: ViewController,
                public navParams: NavParams) {
    }

    ngOnInit() {
        this.cepMask = Util.cepMasc();
        this.enderecoForm = this.fb.group({
            'logradouro': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'cep': [null, Validators.compose([Validators.maxLength(255)])],
            'numero': [null, Validators.compose([Validators.maxLength(255)])],
            'cidade_nome': [null, Validators.compose([Validators.maxLength(255)])],
            'estado_nome': [null, Validators.compose([Validators.maxLength(255)])],
            'complemento': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'cidade_id': [null, Validators.compose([Validators.required])],
            'bairro_id': [null],
            'lat': [null],
            'lng': [null],
            'bairro': [null],
            'id': [null],
            'tipo_endereco': [0, Validators.compose([Validators.required, Validators.maxLength(255)])],
        });
        let anuncio = this.navParams.get("info");
        if(!Util.isNullOrUndefined(anuncio) && anuncio.hasOwnProperty('enderecos')){
            this.enderecoForm.patchValue(anuncio.enderecos[0]);
        }
        this.getLocation();
        this.listaEstados();

    }

    getLocation(){
        this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            this.enderecoForm.controls['lat'].setValue(resp.coords.latitude);
            this.enderecoForm.controls['lng'].setValue(resp.coords.longitude);
        }).catch((error) => {
            this.util.criarAlert('Não te localizamos', 'Por favor ative sua localização para que possamos indicar seu anuncio corretamente.', 'ok');
        });
    }

    localizaCep() {
        let load = this.util.createLoading('Buscando...');
        let cep = this.enderecoForm.controls['cep'].value;
        this.enderecoProvider
            .pesquisarCep(cep)
            .subscribe((e: any) => {
                this.enderecoForm.controls['logradouro'].setValue(e.data.logradouro);
                this.enderecoForm.controls['cidade_id'].setValue(e.data.cidade_id);
                this.enderecoForm.controls['bairro_id'].setValue(e.data.bairro_id);
                this.enderecoForm.controls['cidade_nome'].setValue(e.data.cidade_nome);
                this.enderecoForm.controls['estado_nome'].setValue(e.data.estado_nome);
                load.dismiss();
            },error2 => {
                load.dismiss();
            });
    }

    listaEstados() {
        this.enderecoProvider.listaEstados().subscribe(res => {
            this.estados = res;
            if (this.geoEstado != null) {
                let filter = this.estados.data.filter(item => {
                    return item.nome == this.geoEstado.toUpperCase();
                });
                if (filter.length == 0) {
                    this.util.criarAlert('Não encontrado!', 'não possuímos medicos em sua área no momento deseja encontrar em outra cidade/estado.', 'ok');
                } else {
                    this.enderecoForm.controls["estado_nome"].setValue(filter[0].id);
                    this.mudarEstado(filter[0].id);
                }
            }
        });
    }

    mudarEstado(event) {
        let load = this.util.createLoading();
        this.enderecoProvider.listaCidade(event).subscribe(res => {
            this.cidades = res;
            if (this.geoCidade != null) {
                let filter = this.cidades.data.filter(item => {
                    return item.nome.toUpperCase() == this.geoCidade.toUpperCase();
                });
                if (filter.length == 0) {
                    this.enderecoForm.controls["cidade_nome"].setValue(null);
                } else {
                    this.enderecoForm.controls["cidade_nome"].setValue({
                        id: filter[0].id,
                        nome: filter[0].nome
                    });
                }
            }
            load.dismiss();
        });
    }

    mudarCidade(cidade){
        this.enderecoForm.controls['cidade_id'].setValue(cidade.value.id);
    }

    abrirMapa(){
        this.geolocation.getCurrentPosition().then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            let modal = this.modalCtrl.create('AnuncioMapaPage', {
                lat: resp.coords.latitude,
                lng: resp.coords.longitude
            });
            modal.onDidDismiss((data )=> {
                if(Util.isNullOrUndefined(data))
                    return;
                if(data.hasOwnProperty('data')){
                    this.enderecoForm.controls['lat'].setValue(data.data.lat);
                    this.enderecoForm.controls['lng'].setValue(data.data.lng);
                    //this.enderecoForm.controls['logradouro'].setValue(data.data.titulo);
                }
            });
            let load = this.util.createLoading('Abrindo mapa');
            modal.present().then((value)=>{
                load.dismiss();
            }).catch((err)=>{
                load.dismiss();
                this.util.criarAlert('Não te localizamos', 'Por favor ative sua localização para que possamos indicar seu anuncio corretamente.', 'ok');
            });
        }).catch((error) => {
            this.util.criarAlert('Não te localizamos', 'Por favor ative sua localização para que possamos indicar seu anuncio corretamente.', 'ok');
        });
    }

    salvar(value){
        if(!this.enderecoForm.invalid){
            this.viewCtrl.dismiss({data: value});
        }
    }
}
