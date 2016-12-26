import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AnontownModule, AtApiService } from 'anontown';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { InComponent } from './components/in.component';
import { UserService } from './services/user.service';
import { IndexComponent } from './pages/index.component';
import { AuthComponent } from './pages/auth.component';
import { ClientAddComponent } from './components/client-add.component';
import { ClientComponent } from './components/client.component';
import { TokensComponent } from './pages/tokens.component';
import { ClientsComponent } from './pages/clients.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Config } from './config';

AtApiService.serverURL = Config.serverURL;

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        InComponent,
        AuthComponent,
        ClientAddComponent,
        ClientComponent,
        TokensComponent,
        ClientsComponent
    ],
    imports: [
        AnontownModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {
                path: '',
                component: IndexComponent
            },
            {
                path: 'token',
                component: TokensComponent
            },
            {
                path: 'client',
                component: ClientsComponent
            },
            {
                path: 'auth',
                component: AuthComponent
            }
        ])
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }