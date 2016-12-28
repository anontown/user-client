import { Injectable } from '@angular/core';
import {
    IAuthUser
} from 'anontown';

@Injectable()
export class UserService {
    private auth: IAuthUser = null;
    private authListener = new Set<IAuthListener>();

    constructor() {
    }

    addAuthListener(call: IAuthListener): IAuthListener {
        this.authListener.add(call);
        call(this.auth);
        return call;
    }

    removeAuthListener(call: IAuthListener) {
        this.authListener.delete(call);
    }

    setAuth(auth: IAuthUser) {
        this.auth = auth;
        this.authListener.forEach(f => f(auth));
    }
}

export interface IAuthListener {
    (auth: IAuthUser): void
}