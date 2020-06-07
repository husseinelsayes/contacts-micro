import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Employee } from 'src/app/models/Employee';
import { Permission } from 'src/app/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { Module } from 'src/app/models/module';


@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.scss']
})
export class PermissionAddComponent implements OnInit {

  modulesForm: FormGroup;
  allModules;
  selectedUser : Employee;
  empPermissions : Permission[];
  employees:Employee[];

  constructor(private _fb: FormBuilder, private _permissionService:PermissionService) { 
    this.modulesForm = this._fb.group({
      systems: new FormArray([])
    });
  }


  private addCheckboxes() : FormArray{
    const array = this.allModules.map((module : Module) => {
      var hasPermission = false;
      if(this.empPermissions){
        this.empPermissions.forEach(element => {
          if(module.moduleId=== element.moduleId){
            hasPermission = true;
          }
        })
      }
        return new FormControl(hasPermission);
    });
    return new FormArray(array);
  }

  ngOnInit(): void { 
  }

  checkboxChanged(value){
    const el = value as HTMLElement;
    const checkboxId = el.getAttribute('id');
    if(value.checked){
      this._permissionService.addModuleToUser(new Permission(this.selectedUser.empNid,this._getModuleId(checkboxId))).subscribe(result => {
      },error=> {
        console.log(error);
      });
    }else{
      this._permissionService.removeModuleFromUser(new Permission(this.selectedUser.empNid,this._getModuleId(checkboxId))).subscribe(result => {
      },error=> {
        console.log(error);
      });
    }
  }

  private _getModuleId(index){
    return this.allModules[index].moduleId;
  }

  getEmployeeById(id){
    this._permissionService.getEmployeeByNationalId(id).subscribe((result:Employee) => {
      this.selectedUser = result;
    },error => {
      console.log(error);
    })
  }

  getUserPermissions(){
    if(this.selectedUser){
      
    }
  }

  getEmployeesByName(name){
    this._permissionService.getEmployeesByName(name).subscribe((employees : Employee[]) => {
      this.employees = employees;
    }, error => {
      console.log(error);
    });
  }

  selectUser(id) {
    this.selectedUser = this.employees[id];
    this._permissionService.getUserModules(this.selectedUser.empNid).subscribe(permissions => {
      this.empPermissions = <Permission[]>permissions;
        this._permissionService.findAllModules().subscribe(result => {
          this.allModules = <Module[]> result;
          this.modulesForm = this._fb.group({
            systems: this.addCheckboxes()
          });
          
        },error => {
          console.log(error);
        })
        },error => {
          console.log(error);
        });
  }


}
