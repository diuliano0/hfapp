import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ConfigProvider} from "../base/config";
import {map} from "rxjs/operators";
import {Observable} from "rxjs/Observable";


@Injectable()
export class UsuarioProvider {

  public ressourceUrl: any = ConfigProvider.host + '/api/v1/admin/core/user';

  constructor(public http: HttpClient) {
  }

  recuperarSenha(data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.post(this.ressourceUrl + '/password/reset', data, {
      params: params,
      headers: headers
    }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

  alterarSenha(data, params: any = {}, headers: HttpHeaders = null): Observable<any> {
    return this.http.put(this.ressourceUrl + '/password/change', data, {
      params: params,
      headers: headers
    }).pipe(
        map((response: any) => {
          return response;
        })
    );
  }

}
