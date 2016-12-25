import { Component } from '@angular/core';
import { AtApiService, AtError } from 'anontown';
import { UserService } from '../services/user.service';

@Component({
    selector: 'at-in',
    template: `
        <div class="container">
            <form (ngSubmit)="ok()">
                <div class="alert alert-danger" *ngIf="errorMsg!==null">
                    <span class="glyphicon glyphicon-exclamation-sign"></span>
                    {{errorMsg}}
                </div>

                <div class="form-group">
                    <label>スクリーンネーム</label>
                    <input type="text" class="form-control" [(ngModel)]="sn" name="sn">
                </div>
                <div class="form-group">
                    <label>pass</label>
                    <input type="text" class="form-control" [(ngModel)]="pass" name="pass">
                </div>
                <div class="form-group">
                    <label>ログイン/登録</label>
                    <select [(ngModel)]="isLogin" class="form-control" name="isLogin">
                        <option [ngValue]="true" selected>ログイン</option>
                        <option [ngValue]="false">登録</option>
                    </select>
                </div>

                <button type="submit" class="btn btn-default">OK</button>
            </form>
        </div>
    `,
})
export class InComponent {
    private sn = "";
    private pass = "";
    private isLogin = true;
    private errorMsg: string | null = null;

    constructor(private api: AtApiService, private user: UserService) { }

    ok() {
        (async () => {
            let id: string;
            if (!this.isLogin) {
                let user = await this.api.createUser({ sn: this.sn, pass: this.pass });
                id = user.id;
            } else {
                id = await this.api.findUserID({ sn: this.sn });
            }
            await this.user.login({ id, pass: this.pass });
        })().catch(e => {
            if (e instanceof AtError) {
                this.errorMsg = e.message;
            } else {
                throw e;
            }
        });
    }
}
