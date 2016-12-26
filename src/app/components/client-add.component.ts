import { Component } from '@angular/core';
import { AtApiService, AtError } from 'anontown';
import { UserService } from '../services/user.service';


@Component({
  selector: 'at-client-add',
  templateUrl: './client-add.component.html',
})
export class ClientAddComponent {
  private url = "";
  private name = "";
  private errorMsg: string | null = null;

  constructor(private api: AtApiService,
    private user: UserService) {

  }

  ok() {
    (async () => {
      let client = await this.api.createClient(this.user.auth, {
        name: this.name,
        url: this.url
      });
      this.user.clients.push(client);
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
