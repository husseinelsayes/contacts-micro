import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../models/person';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatcsService {

  constructor(private _http:HttpClient,private sanitizer: DomSanitizer) { }

  apiUrl = environment.apiURL + '/users/';
  getContactsByArabicName(filter){
    console.log('searching for ... '+ this.apiUrl+'ar/' + filter);
    return this._http.get(this.apiUrl+'ar/' + filter).pipe(
      map((persons : Person[]) => {
        for(let person of persons){
          if(person.image){
            person.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ person.image);
          } 
        }
        return persons;
      })
    );
  }

  getAllContacts(){
    return this._http.get(this.apiUrl).pipe(
      map((persons : Person[]) => {
        for(let person of persons){
          if(person.image){
            person.image = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ person.image);
          } 
        }
        return persons;
      })
    );
  }
}
