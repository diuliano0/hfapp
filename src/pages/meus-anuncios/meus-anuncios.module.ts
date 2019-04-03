import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusAnunciosPage } from './meus-anuncios';
import {Ionic2RatingModule} from "ionic2-rating";
import {IonicImageViewerModule, IonicImageViewerModule} from "ionic-img-viewer";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    MeusAnunciosPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusAnunciosPage),
    Ionic2RatingModule,
    IonicImageViewerModule,
    ComponentsModule
  ],
})
export class MeusAnunciosPageModule {}
