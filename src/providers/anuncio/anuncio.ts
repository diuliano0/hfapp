import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigProvider} from "../base/config";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";

/*
  Generated class for the AnuncioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AnuncioProvider {

  public ressourceUrl: any = ConfigProvider.host + '/api/v1/admin/anuncio/anuncio';

  constructor(public http: HttpClient) {}

  list(params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.get(this.ressourceUrl, {
      params: params,
      headers: headers
    }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

}