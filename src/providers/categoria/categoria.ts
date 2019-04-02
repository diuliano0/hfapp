import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigProvider} from "../base/config";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

/*
 Generated class for the CategoriaProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class CategoriaProvider {

    public ressourceUrl: any = ConfigProvider.host + '/api/v1/front/anuncio/categoria';

    constructor(public http: HttpClient) {
    }

    listaCategorias(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get(this.ressourceUrl + '/lista-categoria', {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

}
