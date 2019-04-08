import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ConfigProvider} from "../base/config";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

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

    update(data, params: any = {}, headers: HttpHeaders = null) {
        return this.http.put(this.ressourceUrl, data, {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    mudarImagem(data, params: any = {}, headers: HttpHeaders = null) {
        return this.http.post(this.ressourceUrl+'/mudar-imagem', data, {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    perfil(params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get(this.ressourceUrl + '/perfil', {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

    favoritar(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get(this.ressourceUrl + `/favoritar/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }
    desfavoritar(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
        return this.http.get(this.ressourceUrl + `/desfavoritar/${id}`, {
            params: params,
            headers: headers
        }).pipe(
            map((response: any) => {
                return response;
            })
        );
    }

}
