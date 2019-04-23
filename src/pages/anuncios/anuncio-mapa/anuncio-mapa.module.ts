import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AnuncioMapaPage} from './anuncio-mapa';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
    declarations: [
        AnuncioMapaPage,
    ],
    imports: [
        IonicPageModule.forChild(AnuncioMapaPage),
        ComponentsModule
    ],
})
export class AnuncioMapaPageModule {
}
