import { Component } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
    template: `
        <div *ngIf="user.isLogin" class="container">
            <at-client *ngFor="let c of user.clients" [client]="c"></at-client>
            <at-client-add></at-client-add>
        </div>
    `,
})
export class ClientsComponent {
    private user: UserService;
    constructor(user: UserService) {
        this.user = user;
    }
}
