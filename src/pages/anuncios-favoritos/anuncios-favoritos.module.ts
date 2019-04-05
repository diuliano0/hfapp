import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnunciosFavoritosPage } from './anuncios-favoritos';
import {Ionic2RatingModule} from "ionic2-rating";
import {IonicImageViewerModule} from "ionic-img-viewer";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    AnunciosFavoritosPage,
  ],
  imports: [
    IonicPageModule.forChild(AnunciosFavoritosPage),
    Ionic2RatingModule,
    IonicImageViewerModule,
    ComponentsModule
  ],
})
export class AnunciosFavoritosPageModule {}
