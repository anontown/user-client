import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AtApiService, Client, AtError, IAuthUser,IAtError } from 'anontown';

@Component({
    selector: 'at-client-edit',
    templateUrl: './client-edit.component.html'
})
export class ClientEditComponent extends OnInit {
    @Input()
    client: Client;

    @Output()
    update = new EventEmitter<Client>();

    @Input()
    auth: IAuthUser;

    constructor(private api: AtApiService) {
        super();
    }

    name: string;
    url: string;
    errors: IAtError[] = [];
    ngOnInit() {
        this.name = this.client.name;
        this.url = this.client.url;
    }
    ok() {
        (async () => {
            let client = await this.api.updateClient(this.auth, {
                id: this.client.id,
                name: this.name,
                url: this.url
            });
            this.update.emit(client);
            this.errors = [];
        })().catch(e => {
            if (e instanceof AtError) {
                this.errors = e.errors;
            } else {
                throw e;
            }
        });
    }
}
