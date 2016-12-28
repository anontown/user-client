import { Component, Output, EventEmitter } from '@angular/core';
import { AtApiService, AtError, IAuthUser } from 'anontown';

@Component({
    selector: 'at-in',
    templateUrl: './in.component.html',
})
export class InComponent {
    private sn = "";
    private pass = "";
    private isLogin = true;
    private errorMsg: string | null = null;

    @Output()
    login = new EventEmitter<IAuthUser>();

    constructor(private api: AtApiService) { }

    ok() {
        (async () => {
            let id: string;
            if (!this.isLogin) {
                let user = await this.api.createUser({ sn: this.sn, pass: this.pass });
                id = user.id;
            } else {
                id = await this.api.findUserID({ sn: this.sn });
            }
            let auth = { id, pass: this.pass };
            await this.api.authUser(auth);
            this.login.emit(auth)
        })().catch(e => {
            if (e instanceof AtError) {
                this.errorMsg = e.message;
            } else {
                throw e;
            }
        });
    }
}
