import { Injectable } from '@angular/core';
import { AtApiService, IAuthUser, Client, Token } from 'anontown';

@Injectable()
export class UserService {
    private user: User | null = null;
    loginEvent: { (): void }[] = [];

    constructor(private api: AtApiService) { }

    async login(authUser: IAuthUser) {
        this.user = {
            auth: authUser,
            clients: await this.api.findClientAll(authUser),
            tokens: await this.api.findTokenAll(authUser),
        };
        this.loginEvent.forEach(f => f());
    }

    get isLogin(): boolean {
        return this.user !== null;
    }

    get notLogin(): boolean {
        return this.user === null;
    }

    get auth(): IAuthUser {
        if (this.user === null) {
            throw new TypeError();
        }
        return this.user.auth;
    }

    get tokens(): Token[] {
        if (this.user === null) {
            throw new TypeError();
        }
        return this.user.tokens;
    }

    get clients(): Client[] {
        if (this.user === null) {
            throw new TypeError();
        }
        return this.user.clients;
    }
}

export interface User {
    auth: IAuthUser,
    tokens: Token[],
    clients: Client[]
}