import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Client } from 'anontown';

@Component({
    selector: 'at-client',
    templateUrl: './client.component.html'
})
export class ClientComponent implements OnInit {
    @Input()
    client: Client;

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
