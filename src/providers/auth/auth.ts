import {HttpClient, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
 Generated class for the AuthProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class AuthProvider {

    constructor(public http: HttpClient) {
    }

    cachedRequests: Array<HttpRequest<any>> = [];

    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }

    public retryFailedRequests(): void {}

    static getUser(){
        let usuario = window.localStorage.getItem('usuario');
        if(usuario == null){
            return null;
        }
        return JSON.parse(usuario).data;
    }

    static setUser(user){
        window.localStorage.setItem('usuario', JSON.stringify(user));
    }

    static getUserId(){
        return AuthProvider.getUser().id;
    }

    static autenticado(){
        let usuario = window.localStorage.getItem('usuario');
        return !(usuario == null);
    }

    static deslogar(){
        window.localStorage.removeItem('usuario');
    }
}
