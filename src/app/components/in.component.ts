import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { AtApiService, AtError, IAuthUser } from 'anontown';
import { Config } from '../config';
import { ReCaptchaComponent } from 'angular2-recaptcha/lib/captcha.component';


@Component({
    selector: 'at-in',
    templateUrl: './in.component.html',
})
export class InComponent {
    private sn = "";
    private pass = "";
    private isLogin = true;
    private errorMsg: string | null = null;
    siteKey = Config.recaptcha;

    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;

    @Output()
    login = new EventEmitter<{ auth: IAuthUser, sn: string }>();

    constructor(private api: AtApiService) { }

    async ok() {
        try {
            let id: string;
            if (!this.isLogin) {
                let user = await this.api.createUser(this.captcha.getResponse() as string,
                    {
                        sn: this.sn,
                        pass: this.pass
                    });
                id = user.id;
            } else {
                id = await this.api.findUserID({ sn: this.sn });
            }
            let auth = { id, pass: this.pass };
            await this.api.authUser(auth);
            this.login.emit({ auth, sn: this.sn })
        } catch (e) {
            if (this.captcha) {
                this.captcha.reset();
            }
            if (e instanceof AtError) {
                this.errorMsg = e.message;
            } else {
                throw e;
            }
        }
    }
}
