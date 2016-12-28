import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { AtApiService, AtError, IAuthUser } from 'anontown';
import { UserService, IAuthListener } from '../services/user.service';


@Component({
    templateUrl: './index.component.html',
})
export class IndexComponent implements OnInit, OnDestroy {
    private auth: IAuthUser = null;
    pass: string = "";
    private errorMsg: string | null = null;

    constructor(private user: UserService, private api: AtApiService) {
    }

    private authListener: IAuthListener;
    ngOnInit() {
        this.authListener = this.user.addAuthListener(async auth => {
            this.auth = auth;
            if (auth !== null) {
                this.pass = auth.pass;
            }
        });
    }
    ngOnDestroy() {
        this.user.removeAuthListener(this.authListener);
    }

    ok() {
        (async () => {
            await this.api.updateUser(this.auth, { pass: this.pass });
            await this.user.setAuth({ id: this.auth.id, pass: this.pass });
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
