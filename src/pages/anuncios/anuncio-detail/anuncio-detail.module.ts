import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnuncioDetailPage } from './anuncio-detail';

@NgModule({
  declarations: [
    AnuncioDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(AnuncioDetailPage),
  ],
})
export class AnuncioDetailPageModule {}
