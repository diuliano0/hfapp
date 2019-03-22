import {Injectable} from "@angular/core";
import {HttpParams} from "@angular/common/http";
import {BasePage} from "./base-page";

@Injectable()
export abstract class ListAbstract extends BasePage {

    protected _params: HttpParams;


    constructor() {
        super();
        this._params = new HttpParams();
    }

    protected addParams(key, val) {
        this._params.set(key, val);
    }

    protected removeParams(key) {
        this._params.delete(key);
    }

    get params(): HttpParams {
        return this._params;
    }

}

