import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioDadosBasicosPage } from './anuncio-dados-basicos';
import {ComponentsModule} from "../../../components/components.module";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {IonicSelectableModule} from "ionic-selectable";

@NgModule({
  declarations: [
    AnuncioDadosBasicosPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioDadosBasicosPage),
    CurrencyMaskModule,
    ComponentsModule,
    IonicSelectableModule
  ],
})
export class AnuncioDadosBasicosPageModule {}
