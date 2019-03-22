import {ActionSheetController, AlertController, LoadingController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {DatePipe} from "@angular/common";
import {ConfigProvider} from "./config";
import {conformToMask} from "text-mask-core/dist/textMaskCore";

@Injectable()
export class Util {

    constructor(public alerta: AlertController,
                public actionSheetCtrl: ActionSheetController,
                public loadingCtrl: LoadingController) {
    }

    static dateFrom(string): any {
        return new Date(string);
    }

    static dateFromConvert(string): any {
        let partes = string.split('/');
        return new Date(partes[2], partes[1] - 1, partes[0]);
    }

    static dateDiff(a, b) {
        let diff = Util.dateFrom(a.replace(' ','T')) - Util.dateFrom(b.replace(' ','T'));
        return Math.round(diff / 864e5) + 1;
    }

    static addMinutes(date, minutes) {
        return new Date(date.getTime() + (minutes * 60000));
    }

    static addDay(date, days) {
        return new Date(date.getTime() + (days * 86400000));
    }

    public criarAlert(title, subTitle, buttons) {
        let alert = this.alerta.create({
            title: title,
            subTitle: subTitle,
            buttons: [buttons]
        });
        alert.present();
        return alert;
    }

    /**
     [
     {
       text: 'Destructive',
       role: 'destructive',
       handler: () => {
         console.log('Destructive clicked');
       }
     },
     {
       text: 'Archive',
       handler: () => {
         console.log('Archive clicked');
       }
     },
     {
       text: 'Cancel',
       role: 'cancel',
       handler: () => {
         console.log('Cancel clicked');
       }
     }
     ]
     * */
    public criarActionSheet(title, buttons) {
        let actionSheet  = this.actionSheetCtrl.create({
            title: title,
            cssClass: 'action-sheets-basic-page',
            buttons: buttons
        });
        actionSheet .present();
        return actionSheet ;
    }

    /**
     [
     {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
             console.log('Cancel clicked');
         }
     },
     {
         text: 'Buy',
         handler: () => {
             console.log('Buy clicked');
         }
     }
     ]
     * @param title
     * @param message
     * @param buttons
     */
    public criarConfirmacao(message, buttons, title = 'Confirmação') {
        let alert = this.alerta.create({
            title: title,
            message: message,
            buttons: buttons
        });
        alert.present();
        return alert;
    }

    static transformDate(data, format) {
        let datePipe = new DatePipe(ConfigProvider.language);
        return datePipe.transform(data, format)
    }

    createLoading(content = "Carregando...") {
        let load = this.loadingCtrl.create({
            content: content,
        })
        load.present();
        return load;
    }

    /**
     * Converte o dia da semana de numério para string
     * */
    static converterDiaSemana(dia) {
        let diaString = ['DOMINGO', 'SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO'];
        return diaString[dia];
    }

    /**
     item deve ser passado no formato SEGUNDA,TERÇA
     * */
    static checkDiaSemanaBloqueado(item: string, dia: number): boolean {
        let auxDia = item.replace(/([\{\}])/,'').split(',');
        if (Util.isArray(auxDia)) {
            let checkDias = auxDia.filter((v) => {
                return (v.indexOf(Util.converterDiaSemana(dia)) > -1);
            });
            if (checkDias.length > 0) {return true};
        } else {
            if (item == Util.converterDiaSemana(dia)) return true;
        }
        return false;
    }

    static isArray(obj): boolean {
        return Array.isArray(obj);
    }

    static removeAcento(text): string{
        text = text.toLowerCase();
        text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
        text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
        text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
        text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
        text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
        text = text.replace(new RegExp('[Ç]','gi'), 'c');
        return text;
    }

    static dddPhoneMask(value, self = null) {
        if (value == null) {
            return value;
        }
        if (value.length < 5)
            return value;


        const phoneNumberMask9 = ['(', /[1-9]/, /[1-9]/, ')',/\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        const phoneNumberMask8 = ['(', /[1-9]/, /[1-9]/, ')',/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        let conformedPhoneNumber: any;

        if (value.length > 13) {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask9,
                {guide: false}
            );
        } else {
            conformedPhoneNumber = conformToMask(
                value,
                phoneNumberMask8,
                {guide: false}
            );
        }

        return conformedPhoneNumber.conformedValue;

    }
}
