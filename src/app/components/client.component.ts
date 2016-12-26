import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AtApiService, Client } from 'anontown';
import { UserService } from '../services/user.service';

@Component({
    selector: 'at-client',
    template: `
        <div>
            <dl class="dl-horizontal">
                <dt>ID</dt>
                <dd>{{client.id}}</dd>
                <dt>名前</dt>
                <dd>{{client.name}}</dd>
                <dt>URL</dt>
                <dd>{{client.url}}</dd>
            </dl>
            <button type="button" class="btn btn-default" (click)="edit()">
                <span class="glyphicon glyphicon-edit"></span>
            </button>
            <form *ngIf="isEdit" (ngSubmit)="editOk()">
                <div class="form-group">
                    <label>名前</label>
                    <input type="text" class="form-control" [(ngModel)]="name" name="name">
                </div>
                <div class="form-group">
                    <label>URL</label>
                    <input type="text" class="form-control" [(ngModel)]="url" name="url">
                </div>
                <button type="submit" class="btn btn-default">OK</button>
            </form>
        </div>
    `,
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
