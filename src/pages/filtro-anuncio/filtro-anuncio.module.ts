import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltroAnuncioPage } from './filtro-anuncio';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    FiltroAnuncioPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltroAnuncioPage),
    ComponentsModule
  ],
})
export class FiltroAnuncioPageModule {}
