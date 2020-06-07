import {Injectable} from '@angular/core';
// import {CookieService} from 'ngx-cookie-service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    clientId = 'UIClient';
    clientSecret = 'U!$ecrET_05';
    authServerURL = '';

    constructor(private _router: Router, private _http: HttpClient) {
    }

    retrieveToken(code) {

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', this.clientId);
        params.append('code', code);
        const headers = new HttpHeaders(
            {
                'Content-type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Credentials' : 'true',
                // 'Access-Control-Allow-Methods':'DELETE, POST, GET, OPTIONS',
                // 'Access-Control-Allow-Headers' : 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
            });
        this._http.post(this.authServerURL + '/auth/oauth/token', params.toString(), {headers})
            .subscribe(
                data => {
                    this.saveToken(data);
                }
            );
    }

    saveToken(token) {
        // this._cookieService.delete('access_token');
        localStorage.setItem('access_token', token.access_token);
    }

    checkCredentials(): boolean {
        return true;
        // !!localStorage.getItem('access_token');
    }

    getResource(resourceUrl): Observable<any> {
        const headers = new HttpHeaders({
            // 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            // Authorization: 'Bearer ' + localStorage.getItem('access_token')
        });

        return this._http.get(resourceUrl, {headers});
    }

    postResource(resourceUrl, obj: any): Observable<any> {
        const headers = new HttpHeaders({
            // 'Content-type': 'application/json',
            // Authorization: 'Bearer ' + localStorage.getItem('access_token')
        });
        console.log(obj);
        return this._http.post(resourceUrl, obj, {headers});
    }

    logout() {
        // const headers = new HttpHeaders({Authorization: 'Bearer ' + localStorage.getItem('access_token')});
        // this._http.post(this.authServerURL + '/auth/oauth/logout', null, {headers}).subscribe(response => {
        //     console.log(response);
        // }, error => {
        //     console.log('error is ', error);
        // });
        // localStorage.removeItem('access_token');
        // this._cookieService.delete('JSESSIONID');
        // location.reload();
    }
}
