import { Component, OnInit, OnDestroy } from '@angular/core';
import { AtApiService, Token, IAuthUser, Client } from 'anontown';
import { ActivatedRoute } from '@angular/router';
import { UserService, IAuthListener } from '../services/user.service';
import * as Immutable from 'immutable';

@Component({
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
    client: Client = null;
    tokens: Immutable.List<Token> = null;
    auth: IAuthUser = null;

    constructor(private api: AtApiService,
        private route: ActivatedRoute,
        private user: UserService) {

    }

    async ok() {
        //トークンの検索→作成/有効化
        let token = this.tokens.find(t => t.client === this.client.id);

        //実際に認証するトークン
        let auth: Token;
        if (token === undefined) {
            //認証していない
            auth = await this.api.createToken(this.auth, { client: this.client.id });
        } else if (!token.active) {
            //認証した事はあるが有効でない
            auth = await this.api.enableToken(this.auth, { id: token.id });
        } else {
            //認証済み
            auth = token;
        }

        //クライアントURL、トークンリクエスト取得
        let url = (await this.api.findClientOne(this.auth, { id: this.client.id })).url;
        let req = await this.api.createTokenReq({ id: auth.id, key: auth.key });

        //リダイレクト
        location.href = url + "?" + "id=" + req.token + "&key=" + encodeURI(req.key);
    }

    private authListener: IAuthListener;

    ngOnDestroy() {
        this.user.removeAuthListener(this.authListener);
    }

    ngOnInit() {
        let clientID = "";
        this.route.queryParams.forEach((params) => {
            clientID = params["client"];
        });

        this.authListener = this.user.addAuthListener(async auth => {
            if (auth !== null) {
                let tokens = Immutable.List(await this.api.findTokenAll(auth));
                let client = await this.api.findClientOne(auth, { id: clientID });

                this.auth = auth;
                this.tokens = tokens;
                this.client = client;
            } else {
                this.auth = auth;
                this.tokens = null;
                this.client = null;
            }
        })
    }
}