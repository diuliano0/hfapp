import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioFotoOpcoesPage } from './anuncio-foto-opcoes';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
  declarations: [
    AnuncioFotoOpcoesPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioFotoOpcoesPage),
      ComponentsModule
  ],
})
export class AnuncioFotoOpcoesPageModule {}
