import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map} from "rxjs/operators";
import {TokenModel} from "../../models/token.model";
import {Observable} from "rxjs";
import {ConfigProvider} from "../base/config";

const OauthLoginEndPointUrl: any = ConfigProvider.host + '/api/v1/admin/core/auth/token';

@Injectable()
export class AuthProvider {

    constructor(public http: HttpClient) {
    }

    cachedRequests: Array<HttpRequest<any>> = [];

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    getAccessToken(user): Observable<TokenModel> {
      user.client_id = ConfigProvider.client_id;
      user.client_secret = ConfigProvider.token;
      user.grant_type = ConfigProvider.grant_type;
      return this.http.post(OauthLoginEndPointUrl, user).pipe(
        map((response: any) => {
          let res = new TokenModel().deserialize(response);
          AuthProvider.setToken(res);
          return res;
        })
      );
    }

    public retryFailedRequests(): void {}

    static getUser(){
        let usuario = JSON.parse(window.localStorage.getItem('usuario'));
        if(usuario == null){
            return null;
        }
        return usuario;
    }

    static setUser(user){
        window.localStorage.setItem('usuario', JSON.stringify(user));
    }

    static getToken(){
        let token = window.localStorage.getItem('token');
        if(token == null){
            return null;
        }
        return JSON.parse(token);
    }

    static setToken(token){
        window.localStorage.setItem('token', JSON.stringify(token));
    }

    static getAccessTokenString() {
      return AuthProvider.getToken().access_token;
    }

    static getContextUser() {
      return AuthProvider.getToken().context_user;
    }

    static getUserId(){
        return AuthProvider.getUser().id;
    }

    static autenticado(){
      return !!AuthProvider.getToken();
    }

    static deslogar(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('usuario');
    }

    static setFCMToken(token){
        window.localStorage.setItem('fcm_token', JSON.stringify(token));
    }

    static getFCMToken(){
        return window.localStorage.getItem('fcm_token').replace('"').replace('"');
    }

    static setDeviceUUID(uuid){
        window.localStorage.setItem('device_uuid', JSON.stringify(uuid));
    }

    static getDeviceUUID(){
        return window.localStorage.getItem('device_uuid');
    }
}
