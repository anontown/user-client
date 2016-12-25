import { Component, OnInit } from '@angular/core';
import { AtApiService, Token } from 'anontown';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
    template: `
        <div *ngIf="user.isLogin" class="container">
            認証しますか？
            <button type="button" class="btn btn-default" (click)="ok()">OK</button>
        </div>
    `,
})
export class AuthComponent implements OnInit {
    client: string;

    constructor(private api: AtApiService,
        private route: ActivatedRoute,
        private user: UserService) {

    }

    async ok() {
        //トークンの検索→作成/有効化
        let token = this.user.tokens.find(t => t.client === this.client);

        //実際に認証するトークン
        let auth: Token;
        if (token === undefined) {
            //認証していない
            auth = await this.api.createToken(this.user.auth, { client: this.client });
        } else if (!token.active) {
            //認証した事はあるが有効でない
            auth = await this.api.enableToken(this.user.auth, { id: token.id });
        } else {
            //認証済み
            auth = token;
        }

        //クライアントURL、トークンリクエスト取得
        let url = (await this.api.findClientOne(this.user.auth, { id: this.client })).url;
        let req = await this.api.createTokenReq({ id: auth.id, key: auth.key });

        //リダイレクト
        location.href = url + "?" + "id=" + req.token + "&key=" + encodeURI(req.key);
    }

    ngOnInit() {
        this.route.queryParams.forEach((params) => {
            this.client = params["client"];
        });
    }
}