import { Component } from '@angular/core';
import { AtApiService, AtError } from 'anontown';
import { UserService } from '../services/user.service';


@Component({
    templateUrl: './index.component.html',
})
export class IndexComponent {
    pass: string = "";
    private errorMsg: string | null = null;

    constructor(private user: UserService, private api: AtApiService) {
        if (user.isLogin) {
            this.pass = user.auth.pass;
        } else {
            user.loginEvent.push(() => {
                this.pass = user.auth.pass;
            });
        }
    }

    ok() {
        (async () => {
            await this.api.updateUser(this.user.auth, { pass: this.pass });
            this.user.auth.pass = this.pass;
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
