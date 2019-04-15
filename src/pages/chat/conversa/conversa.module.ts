import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ConversaPage} from './conversa';
import {ComponentsModule} from "../../../components/components.module";

@NgModule({
    declarations: [
        ConversaPage,
    ],
    imports: [
        IonicPageModule.forChild(ConversaPage),
        ComponentsModule
    ],
})
export class ConversaPageModule {
}
