import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, LOCALE_ID, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MyApp} from './app.component';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {DataProvider} from '../providers/data/data';
import {Ionic2RatingModule} from 'ionic2-rating';
import {IonicImageViewerModule} from 'ionic-img-viewer';
import {SwingModule} from 'angular2-swing';
import {SuperTabsModule} from 'ionic2-super-tabs';
import {CalendarModule} from "ion2-calendar";
import {InterceptedHttpProvider} from "../providers/intercepted-http/intercepted-http";
import {registerLocaleData} from "@angular/common";
import ptBr from '@angular/common/locales/pt';
import {Util} from "../providers/base/util";
import {UsuarioProvider} from '../providers/usuario/usuario';
import {AnuncioProvider} from '../providers/anuncio/anuncio';
import {AnuncianteProvider} from '../providers/anunciante/anunciante';
import {CategoriaProvider} from '../providers/categoria/categoria';
import {IonicSelectableModule} from "ionic-selectable";
import {EnderecoProvider} from '../providers/endereco/endereco';
import {UniqueDeviceID} from "@ionic-native/unique-device-id";
import {FCM} from "@ionic-native/fcm";
import {Geolocation} from "@ionic-native/geolocation";
import {BrMaskerModule} from "brmasker-ionic-3";

registerLocaleData(ptBr);
// By default TranslateLoader will look for translation json files in i18n/
// So change this lool in the src/assets directory.
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicSelectableModule,
        SwingModule,
        SuperTabsModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IonicModule.forRoot(MyApp, {
            menuType: 'overlay'
        }),
        Ionic2RatingModule,
        IonicImageViewerModule,
        CalendarModule,
        BrMaskerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptedHttpProvider,
            multi: true
        },
        UniqueDeviceID,
        FCM,
        Geolocation,
        {provide: LOCALE_ID, useValue: 'pt'},
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        HttpClient,
        DataProvider,
        Util,
        UsuarioProvider,
        AnuncioProvider,
        AnuncianteProvider,
        CategoriaProvider,
        EnderecoProvider,
    ]
})
export class AppModule {
}
