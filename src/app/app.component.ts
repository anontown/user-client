import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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

