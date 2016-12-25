import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-default navbar-fixed-top" (window:resize)="resize()" #nav>
    <div class="container-fluid">
      <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>

      <a [routerLink]="['/']" class="navbar-brand">Anontown</a>
      </div>
      <div id="navbar" class="navbar-collapse collapse">
      <ul class="nav navbar-nav">
        <li>
        <a [routerLink]="['/token']">連携アプリ管理</a>
        </li>
        <li>
        <a [routerLink]="['/client']">クライアント管理(開発者向け)</a>
        </li>
      </ul>
      </div>
    </div>
    </nav>

    <at-in *ngIf="user.notLogin"></at-in>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('nav') nav: ElementRef;
  resize() {
    document.body.style.paddingTop = this.nav.nativeElement.clientHeight + 20 + "px";
  }

  ngOnInit() {
    this.resize();
  }

  private user: UserService;
  constructor(user: UserService) {
    this.user = user;
  }
}

