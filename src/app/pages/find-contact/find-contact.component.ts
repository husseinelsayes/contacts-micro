import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ContatcsService } from 'src/app/services/contatcs.service';

@Component({
  selector: 'app-find-contact',
  templateUrl: './find-contact.component.html',
  styleUrls: ['./find-contact.component.scss']
})
export class FindContactComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  persons : Person[];
  filteredPersons : Person[];

  constructor(private _contactsService : ContatcsService) { }

  ngOnInit() {
    this.getAllContacts();
    this.persons = [
      { name_ar : 'حسين امام السايس', name_en : 'Hussein Emam Elsayes',email : 'hussein@mail.com',ipPhone : '2458', jobTitle : 'Programmer' ,image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Ahmed Abd El Salam',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Shaker Abdullah',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'John Due',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Carmella Johnson',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Steven Cambell',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'John Stallone',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Mike John',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Lucas Modric',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'Chirstian Person',image : ''},
      {email : 'hussein@mail.com', ipPhone : '2458' , jobTitle : 'Programmer' , name_ar : 'حسين امام السايس', name_en : 'paolo Carpenter',image : ''},
    ];

    //this.filteredPersons = this.persons;

    this.searchControl.valueChanges
    .pipe(debounceTime(200))
    .subscribe(value => {
      if(value != ''){
        console.log(value);
        this.getContactsByArabicName(value);
      }else{
        this.getAllContacts();
      }
      
    });
  }


  getContactsByArabicName(val) {
      this._contactsService.getContactsByArabicName(val).subscribe((personList : Person[])=>{
        this.filteredPersons = personList.filter(x => x.jobTitle);
      },error => {
        console.log(error);
      })
  }

  getAllContacts(){
    this._contactsService.getAllContacts().subscribe((personList : Person[])=>{
      this.filteredPersons = personList.filter(x => x.jobTitle);
    },error => {
      console.log(error);
    })
  }
    
}
