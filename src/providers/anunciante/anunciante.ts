import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigProvider} from "../base/config";
import {map} from "rxjs/operators";

/*
 Generated class for the AnuncianteProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AnuncianteProvider {
    public ressourceUrl: any = ConfigProvider.host + '/api/v1/front/anuncio/anunciante';

    constructor(public http: HttpClient) {
    }

    create(data, params: any = {}, headers: HttpHeaders = null) {
        return this.http.post(this.ressourceUrl, data, {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

}
