import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Client } from 'anontown';

@Component({
    template: `
        <div *ngIf="user.isLogin" class="container">
            <at-client *ngFor="let c of user.clients" [client]="c" (update)="update($event)"></at-client>
            <at-client-add></at-client-add>
        </div>
    `,
})
export class ClientsComponent {
    private user: UserService;
    constructor(user: UserService) {
        this.user = user;
    }

    update(client: Client) {
        this.user.clients[this.user.clients.findIndex((c) => c.id === client.id)] = client;
    }
}
