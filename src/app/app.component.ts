import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit {

  ngOnInit() {
  }

  private user: UserService;
  constructor(user: UserService) {
    this.user = user;
  }
}

