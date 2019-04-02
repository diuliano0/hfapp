import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {FiltroAnuncioPage} from './filtro-anuncio';
import {ComponentsModule} from "../../components/components.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {IonicSelectableModule} from "ionic-selectable";

@NgModule({
    declarations: [
        FiltroAnuncioPage,
    ],
    imports: [
        IonicPageModule.forChild(FiltroAnuncioPage),
        CurrencyMaskModule,
        ComponentsModule,
        IonicSelectableModule
    ],
})
export class FiltroAnuncioPageModule {
}
