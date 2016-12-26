import { Component } from '@angular/core';
import { AtApiService, AtError } from 'anontown';
import { UserService } from '../services/user.service';

@Component({
    selector: 'at-in',
    templateUrl: './in.component.html',
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
