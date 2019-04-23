import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ViewController} from 'ionic-angular';
declare var google: any;

/**
 * Generated class for the AnuncioMapaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-anuncio-mapa',
    templateUrl: 'anuncio-mapa.html',
})
export class AnuncioMapaPage {
    map: any;
    geocoder: any;
    address: any;
    titulo = 'Google Maps';
    latLng: any;
    dummyMarker: any;
    mapDragMode: boolean = false;
    centerPos: any;

    constructor(public navCtrl: NavController,
                public viewCtrl: ViewController,
                public navParams: NavParams,
                public platform: Platform) {
        // Get Hotel Address
        this.address = this.navParams.get('address');
        this.latLng = new google.maps.LatLng(this.navParams.get('lat'), this.navParams.get('lng'));
    }


    /**
     * Lifecycle hook that is called after a component's view has been fully initialized.
     */
    ngAfterViewInit() {
        this.platform.ready().then(() => {
            this.loadMap();
        });
    }

    ionViewDidLoad() {
        this.dummyMarker = document.getElementById("centerMarkerImage");
        this.dummyMarker.style.display = 'block';
    }

    /**
     * --------------------------------------------------------------
     * Load Google Map
     * --------------------------------------------------------------
     */
    loadMap() {
        this.geocoder = new google.maps.Geocoder();
        // Map Options
        const mapOptions = {
            zoom: 15,
            center: this.latLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            zoomControl: false,
            streetViewControl: false,
            fullscreenControl: false,
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        // Set Map in Center
        this.map.setCenter(this.latLng);

        // Create Marker
        /*const marker = new google.maps.Marker({
            map: this.map,
            position: this.latLng
        });*/
        this.map.addListener('center_changed', () => {
            this.latLng = new google.maps.LatLng(this.map.getCenter().lat(), this.map.getCenter().lng());
            this.setGeocoder();
        });
        this.setGeocoder();
    }

    setGeocoder(){
        this.geocoder.geocode({
            latLng: this.latLng
        },  (results, status)=> {
            if (status == google.maps.GeocoderStatus.OK) {
                this.titulo = results[0].formatted_address;
            }
        });
    }

    confirmarEnderecoAutocomplete() {
        // this.navCtrl.setRoot('HomePage');
        // this.navCtrl.push('HomeSolicitaPage',{
        //   origem: this.origin,
        //   destino: this.destination
        // });
        this.loadMap();
        this.viewCtrl.dismiss({data: {
            lat: this.latLng.lat(),
            lng: this.latLng.lng(),
            titulo: this.titulo,
        }});
    }

    start() {
        this.mapDragMode = true;
        this.dummyMarker.style.display = 'block';
    }

    end() {
        this.mapDragMode = false;
        this.dummyMarker.style.display = 'none';
    }
}
