import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AtApiService, AtError, Client, IAuthUser,IAtError } from 'anontown';


@Component({
  selector: 'at-client-add',
  templateUrl: './client-add.component.html',
})
export class ClientAddComponent {
  private url = "";
  private name = "";
  private errors: IAtError[] = [];

  @Input()
  auth: IAuthUser;

  @Output()
  add = new EventEmitter<Client>();

  constructor(private api: AtApiService) {

  }

  ok() {
    (async () => {
      let client = await this.api.createClient(this.auth, {
        name: this.name,
        url: this.url
      });
      this.add.emit(client);
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
