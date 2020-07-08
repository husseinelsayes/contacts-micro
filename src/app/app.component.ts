import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService} from 'angular-oauth2-oidc';
import { authConfig } from './services/sso.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router,private _oauthService : OAuthService) {
    //this.configureSSo();
  }
  
  ngOnInit() {
    this.router.initialNavigation();
  }

  configureSSo(){
    this._oauthService.configure(authConfig);
    this._oauthService.tokenValidationHandler = new JwksValidationHandler();
    this._oauthService.tryLogin();
    if(!this._oauthService.hasValidAccessToken()){
      this._oauthService.initImplicitFlow();
    }
  }
}
