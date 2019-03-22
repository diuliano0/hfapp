import {ConfigProvider} from "./config";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export abstract class BaseProvider{

    constructor(protected http: HttpClient){}

    protected host = ConfigProvider.host;

    protected static formatSelect(itens, label, value) {
        const selectItens = [];
        for (let i = 0; i < itens.length; i++) {
            selectItens.push({
                label: itens[i][label],
                value: itens[i][value]
            });
        }
        return selectItens;
    }

    nextPage(_url: string = ""): Observable<any> {

        let options = {headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Enctype': 'application/json'
        }};

        return this.http.get(_url, options);
    }
}