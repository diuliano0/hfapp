import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioFotoPage } from './anuncio-foto';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    AnuncioFotoPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioFotoPage),
      ComponentsModule
  ],
})
export class AnuncioFotoPageModule {}
