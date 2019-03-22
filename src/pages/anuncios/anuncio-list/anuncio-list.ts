import { Component } from '@angular/core';
import {
  IonicPage, ModalController, NavController, NavParams,
  ViewController
} from 'ionic-angular';
import {DataProvider} from "../../../providers/data/data";

/**
 * Generated class for the AnuncioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anuncio-list',
  templateUrl: './anuncio-list.html',
})
export class AnuncioListPage {


  // Array List of Hotels
  hotels: any = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public modalCtrl: ModalController,
              public dataProvider: DataProvider) { }

  /** Do any initialization */
  ngOnInit() {
    this.getHotelList();
  }

  /**
   * -----------------------------------------------------------
   * Get List of Hotel
   * -----------------------------------------------------------
   * From Data Provider Service Call `getHotels` method that Give You List of Hotel
   *
   * You get `DataProvider` Service at - 'src/providers/data/data';
   */
  getHotelList() {
    this.hotels = this.dataProvider.getHotels();
  }

  /**
   * Open Hotel Details Page
   */
  viewDetails(hotel) {
    this.dismiss();
    this.modalCtrl.create('HotelDetailsPage', { hotelDetails: hotel }).present();
  }

  /**
   * Dismiss function
   * This function dismiss the popup modal
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
