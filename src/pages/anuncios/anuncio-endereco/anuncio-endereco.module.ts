import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {AnuncioEnderecoPage} from './anuncio-endereco';
import {ComponentsModule} from "../../../components/components.module";
import {TextMaskModule} from "angular2-text-mask";
import {IonicSelectableModule} from "ionic-selectable";

@NgModule({
    declarations: [
        AnuncioEnderecoPage,
    ],
    imports: [
        IonicPageModule.forChild(AnuncioEnderecoPage),
        ComponentsModule,
        TextMaskModule,
        IonicSelectableModule
    ],
})
export class AnuncioEnderecoPageModule {
}
