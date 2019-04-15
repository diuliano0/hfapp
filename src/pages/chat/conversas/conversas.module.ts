import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ConversasPage} from './conversas';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
    declarations: [
        ConversasPage,
    ],
    imports: [
        IonicPageModule.forChild(ConversasPage),
        ComponentsModule
    ],
})
export class ConversasPageModule {
}
