import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig : AuthConfig = {
    loginUrl : environment.authServerUrl + '/oauth/authorize',
    tokenEndpoint : environment.authServerUrl + '/oauth/token',
    logoutUrl : environment.authServerUrl + '/logout',
    revocationEndpoint : environment.authServerUrl + '/oauth/revoke',
    redirectUri : environment.redirectUrl + '/index.html',
    clientId : 'permission',
    scope : 'READ WRITE',
    requireHttps : false,
    clearHashAfterLogin : true,
    oidc : false
}