import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
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

  public ressourceUrl: any = ConfigProvider.host + '/api/v1/front/anuncio/anuncio';

  constructor(public http: HttpClient) {
  }

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
  update(id, data, params: any = {}, headers: HttpHeaders = null) {
    return this.http.put(this.ressourceUrl+'/'+id, data, {
      params: params,
      headers: headers
    }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  anuncioByPerfil(params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.get(this.ressourceUrl + '/meus-anuncios', {
      params: params,
      headers: headers
    }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updaloadImage(id, data, params: any = {}, headers: HttpHeaders = null) {
    return this.http.post(this.ressourceUrl + '/salvar-imagem/' + id, data, {
      params: params,
      headers: headers
    }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  favotiros(params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.get(this.ressourceUrl + '/favoritos', {
      params: params,
      headers: headers
    }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  removerImagem(id, params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.delete(this.ressourceUrl + '/imagem/destroy-image/' + id, {
      params: params,
      headers: headers
    }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  nextPage(_url: string = ""): Observable<any> {

    let options = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Enctype': 'application/json'
      }
    };

    return this.http.get(_url, options);
  }

  alertaChat(token, data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.post(this.ressourceUrl + '/alerta-mensagem/' + token, data, {
      params: params,
      headers: headers
    }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

}
