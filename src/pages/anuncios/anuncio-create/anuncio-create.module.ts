import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioCreatePage } from './anuncio-create';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    AnuncioCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioCreatePage),
    ComponentsModule
  ],
})
export class AnuncioCreatePageModule {}
