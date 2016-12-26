import { Component } from '@angular/core';
import { AtApiService, Token } from 'anontown';
import { UserService } from '../services/user.service';


@Component({
  template: `
    <div *ngIf="user.isLogin" class="container">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Key</th>
            <th>アプリID</th>
            <th>有効</th>
            <th>Key変更</th>
          <tr>
        </thead>
        <tbody>
          <tr *ngFor="let t of user.tokens">
            <td>{{t.id}}</td>
            <td>{{t.key}}</td>
            <td>{{t.client}}</td>
            <td>
              <button type="button" class="btn btn-default" (click)="active(t)">{{t.active?'有効':'無効'}}</button>
            </td>
            <td>
              <button type="button" class="btn btn-default" (click)="key(t)">
                <span class="glyphicon glyphicon-refresh"></span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `,
})
export class TokensComponent {
  constructor(private user: UserService, private api: AtApiService) {

  }

  async key(token: Token) {
    this.update(await this.api.updateToken(this.user.auth, { id: token.id }));
  }

  async active(token: Token) {
    if (token.active) {
      this.update(await this.api.disableToken(this.user.auth, { id: token.id }));
    } else {
      this.update(await this.api.enableToken(this.user.auth, { id: token.id }));
    }
  }

  update(token: Token) {
    this.user.tokens[this.user.tokens.findIndex((t) => t.id === token.id)] = token;
  }
}
