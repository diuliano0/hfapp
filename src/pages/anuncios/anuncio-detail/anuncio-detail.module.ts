import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AnuncioDetailPage} from './anuncio-detail';
import {Ionic2RatingModule} from "ionic2-rating";
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
    declarations: [
        AnuncioDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(AnuncioDetailPage),
        Ionic2RatingModule, ComponentsModule
    ],
})
export class AnuncioDetailPageModule {
}
