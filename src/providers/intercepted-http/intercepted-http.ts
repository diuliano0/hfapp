import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {tap} from "rxjs/operators";
import {Util} from "../base/util";

//const DEFAULT_HEADER_AUTHORIZATION = 'Authorization';
//const DEFAULT_HEADER_PREFIX_BEARER = 'Bearer';
const DEFAULT_HEADER_ACCEPT = 'Accept';
const DEFAULT_HEADER_JSON_APPLICATION = 'application/json';

@Injectable()
export class InterceptedHttpProvider implements HttpInterceptor {

    constructor(public util: Util) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req.clone({
            headers: req.headers.set(DEFAULT_HEADER_ACCEPT, DEFAULT_HEADER_JSON_APPLICATION)
        });
        /*if(this.storage.isAuthenticated()){
            authReq = req.clone({
                headers: req.headers.set(DEFAULT_HEADER_AUTHORIZATION, DEFAULT_HEADER_PREFIX_BEARER + this.storage.getToken())
            });
        }*/
        return next.handle(authReq).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {

                }
            }, err => {
                let error = err.error;
                let text = "";
                switch (err.status){
                    case 422:
                        for (const i in error.errors) {
                            for (const c in error.errors[i]) {
                                text += `<b>${i}:</b> ${error.errors[i][c]}<br>`;
                            }
                        }
                        this.util.criarAlert('Erro!', text, 'ok');
                        break;
                }
                return err;
            })
        );
    }
}
