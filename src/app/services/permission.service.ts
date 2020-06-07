import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private _http:HttpClient, private _authService : AuthenticationService) { }

  apiUrl = environment.apiURL;
  //get all modules
  findAllModules(){
    return this._authService.getResource(this.apiUrl+ '/modules/');
  }

  getMyModules(){
    return this._authService.getResource(this.apiUrl+ '/modules/me');
  }

  //get module
  findModuleById(id){
    return this._authService.getResource(this.apiUrl+ '/modules/' + id);
  }

  //add module
  addModule(moduleInfo){
    return this._authService.postResource(this.apiUrl+ '/modules/',moduleInfo);
  }
  
  //update module
  updateModule(id,moduleInfo){
    return this._authService.putResource(this.apiUrl+ '/modules/'+id,moduleInfo);
  }

  //delete module
  deleteModule(){
  }

  //add a module to user
  addModuleToUser(permission){
    return this._authService.postResource(this.apiUrl+ '/permissions/grant/',permission);
  }
  
  //remove a module from user
  removeModuleFromUser(permission){
    return this._authService.postResource(this.apiUrl+ '/permissions/remove/',permission);
  }

  //get user modules
  getUserModules(userId){
    return this._authService.getResource(this.apiUrl+ '/permissions/'+userId);
  }

  getEmployeeByNationalId(nationalId){
    return this._authService.getResource(this.apiUrl+ '/employees/'+nationalId);
  }

  getEmployeesByName(name){
    return this._authService.getResource(this.apiUrl+ '/employees/?name='+name);
  }
}
