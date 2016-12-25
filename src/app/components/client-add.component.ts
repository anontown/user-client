import { Component } from '@angular/core';
import { AtApiService, AtError } from 'anontown';
import { UserService } from '../services/user.service';


@Component({
    selector: 'at-client-add',
    template: `
        <form (ngSubmit)="ok()">
            <div class="alert alert-danger" *ngIf="errorMsg!==null">
                <span class="glyphicon glyphicon-exclamation-sign"></span>
                {{errorMsg}}
            </div>
            <div class="form-group">
                <label>名前</label>
                <input type="text" class="form-control" [(ngModel)]="name" name="name">
            </div>
            <div class="form-group">
                <label>URL</label>
                <input type="text" class="form-control" [(ngModel)]="url" name="url">
            </div>
            <button class="btn btn-default" type="submit">OK</button>
        </form>
    `,
})
export class ClientAddComponent {
    private url = "";
    private name = "";
    private errorMsg: string | null = null;

    constructor(private api: AtApiService,
        private user: UserService) {

    }

    ok() {
        (async () => {
            let client = await this.api.createClient(this.user.auth, {
                name: this.name,
                url: this.url
            });
            this.user.clients.push(client);
            this.errorMsg = null;
        })().catch(e => {
            if (e instanceof AtError) {
                this.errorMsg = e.message;
            } else {
                throw e;
            }
        });
    }
}
