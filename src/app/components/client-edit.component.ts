import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AtApiService, Client, AtError } from 'anontown';
import { UserService } from '../services/user.service';

@Component({
    selector: 'at-client-edit',
    templateUrl: './client-edit.component.html'
})
export class ClientEditComponent extends OnInit {
    @Input()
    client: Client;

    @Output()
    update = new EventEmitter<Client>();

    constructor(private api: AtApiService, private user: UserService) {
        super();
    }

    name: string;
    url: string;
    errorMsg: string | null = null;
    ngOnInit() {
        this.name = this.client.name;
        this.url = this.client.url;
    }
    ok() {
        (async () => {
            let client = await this.api.updateClient(this.user.auth, {
                id: this.client.id,
                name: this.name,
                url: this.url
            });
            this.update.emit(client);
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
