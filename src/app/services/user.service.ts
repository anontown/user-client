import { Injectable } from '@angular/core';
import {
    IAuthUser
} from 'anontown';

@Injectable()
export class UserService {
    private auth: IAuthUser = null;
    private sn: string = null;
    private authListener = new Set<IAuthListener>();

    constructor() {
    }

    addAuthListener(call: IAuthListener): IAuthListener {
        this.authListener.add(call);
        call(this.auth, this.sn);
        return call;
    }

    removeAuthListener(call: IAuthListener) {
        this.authListener.delete(call);
    }

    setAuth(auth: IAuthUser, sn: string) {
        this.auth = auth;
        this.sn = sn;
        this.authListener.forEach(f => f(auth, sn));
    }
}

export interface IAuthListener {
    (auth: IAuthUser, sn: string): void
}