import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, IAuthListener } from './services/user.service';
import { IAuthUser } from 'anontown';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  auth: IAuthUser = null;
  private authListener: IAuthListener;

  ngOnInit() {
    this.authListener = this.user.addAuthListener(auth => {
      this.auth = auth;
    });
  }

  ngOnDestroy() {
    this.user.removeAuthListener(this.authListener);
  }

  constructor(private user: UserService) {
  }

  login(auth: IAuthUser) {
    this.user.setAuth(auth);
  }
}

