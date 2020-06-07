import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Module } from 'src/app/models/module';
import { PermissionService } from 'src/app/services/permission.service';
import { IconModalComponent } from 'src/app/components/shared/icon-modal/icon-modal.component';

@Component({
  selector: 'app-module-update',
  templateUrl: './module-update.component.html',
  styleUrls: ['./module-update.component.scss']
})
export class ModuleUpdateComponent implements OnInit {


  moduleInfo = this.fb.group({
    moduleNameAr : [],
    moduleNameEn : [],
    moduleIcon : [],
    moduleLink : []
  })
  selectedIcon;
  id;
  module:Module;
  constructor(private _route : ActivatedRoute, private fb: FormBuilder, private _modal : MatDialog, private _permissionService : PermissionService, private _router : Router) { 
    this.id = this._route.snapshot.paramMap.get('id');
    this._permissionService.findModuleById(this._route.snapshot.paramMap.get('id')).subscribe(result=>{
      this.module = <Module>result;
      this.moduleInfo = this.fb.group({
        moduleNameAr : [this.module.moduleInfo.moduleNameAr, [Validators.required]],
        moduleNameEn : [this.module.moduleInfo.moduleNameEn, [Validators.required]],
        moduleIcon : [this.module.moduleInfo.moduleIcon, [Validators.required]],
        moduleLink : [this.module.moduleInfo.moduleLink, [Validators.required]]
      })
    });

  }

  ngOnInit(): void {

    
  }

  openModal(){
    const dialogRef = this._modal.open(IconModalComponent,{
      maxHeight: '600px',
      maxWidth: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.moduleInfo.get('moduleIcon').setValue(result.selectedIcon);
    })
  }

  submit(){
    console.log(this.moduleInfo.value);
    this._permissionService.updateModule(this.id,this.moduleInfo.value).subscribe(result => {
      this._router.navigate(['/permissions/module-list']);
    },error => {
      console.log(error);
    })
  }

}
