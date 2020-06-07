import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { IconModalComponent } from 'src/app/components/shared/icon-modal/icon-modal.component';
import { PermissionService } from 'src/app/services/permission.service';


@Component({
  selector: 'app-module-add',
  templateUrl: './module-add.component.html',
  styleUrls: ['./module-add.component.scss']
})
export class ModuleAddComponent implements OnInit {
  moduleInfo: FormGroup;
  selectedIcon;

  constructor(private fb: FormBuilder, private _modal : MatDialog, private _permissionService : PermissionService, private _router : Router) { 
      this.moduleInfo = this.fb.group({
        moduleNameAr : ['', [Validators.required]],
        moduleNameEn : ['', [Validators.required]],
        moduleIcon : [null, [Validators.required]],
        moduleLink : ['', [Validators.required]]
      })
    }

  ngOnInit() {
    console.log(this.moduleInfo.get('moduleIcon').value);
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
    this._permissionService.addModule(this.moduleInfo.value).subscribe(result => {
      console.log(result);
      this._router.navigate(['/permissions/module-list']);
    },error => {
      console.log(error);
    })
  }

}
