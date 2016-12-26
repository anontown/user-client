import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Client } from 'anontown';

@Component({
  templateUrl: './clients.component.html',
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
