import { Component } from '@angular/core';
import { AtApiService, Token } from 'anontown';
import { UserService } from '../services/user.service';


@Component({
  templateUrl: './tokens.component.html'
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
