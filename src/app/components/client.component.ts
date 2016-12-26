import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AtApiService, Client } from 'anontown';
import { UserService } from '../services/user.service';

@Component({
    selector: 'at-client',
    templateUrl: './client.component.html'
})
export class ClientComponent extends OnInit {
    @Input()
    client: Client;

    @Output()
    update = new EventEmitter<Client>();

    constructor(private api: AtApiService, private user: UserService) {
        super();
    }

    name: string;
    url: string;
    ngOnInit() {
        this.name = this.client.name;
        this.url = this.client.url;
    }

    isEdit = false;
    edit() {
        this.isEdit = !this.isEdit;
    }
    async editOk() {
        this.update.emit(await this.api.updateClient(this.user.auth, {
            id: this.client.id,
            name: this.name,
            url: this.url
        }));
    }
}
