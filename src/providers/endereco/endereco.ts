import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigProvider} from "../base/config";
import {Observable} from "rxjs/Observable";
import {map} from "rxjs/operators";

/*
  Generated class for the EnderecoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EnderecoProvider {

  public ressourceUrl: any = ConfigProvider.host + '/api/v1/front/anuncio/anuncio';
  private ressourceFrontUrl = ConfigProvider.host+'/api/v1/front/localidade';

  constructor(public http: HttpClient) {

  }

  pesquisarCep(cep, params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.get<any[]>(this.ressourceFrontUrl+'/cep-localidade/'+cep,{
      params: params,
      headers: headers
    }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

}
