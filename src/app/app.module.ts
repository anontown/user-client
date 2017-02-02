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
import { Config } from './config';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { ClientEditComponent } from './components/client-edit.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
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
        ClientsComponent,
        ClientEditComponent
    ],
    imports: [
        AnontownModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        ReCaptchaModule,
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
        ]),
        MaterialModule.forRoot(),
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }