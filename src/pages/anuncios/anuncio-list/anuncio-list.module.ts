import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioListPage } from './anuncio-list';
import {ComponentsModule} from "../../../components/components.module";
import {Ionic2RatingModule} from "ionic2-rating";
import {IonicImageViewerModule} from "ionic-img-viewer";

@NgModule({
  declarations: [
    AnuncioListPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioListPage),
    Ionic2RatingModule,
    IonicImageViewerModule,
    ComponentsModule
  ],
})
export class AnuncioListPageModule {}
