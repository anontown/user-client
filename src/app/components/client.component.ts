import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Client, IAuthUser } from 'anontown';

@Component({
    selector: 'at-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
    @Input()
    client: Client;

    @Input()
    auth: IAuthUser;

    @Output()
    update = new EventEmitter<Client>();

    constructor() {
    }

    ngOnInit() {
    }

    isEdit = false;
    edit() {
        this.isEdit = !this.isEdit;
    }

    ok(client: Client) {
        this.update.emit(client);
        this.isEdit = false;
    }
}
