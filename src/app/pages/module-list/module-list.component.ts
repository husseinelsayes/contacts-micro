import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})

export class ModuleListComponent implements OnInit {
  constructor(private _permissionService : PermissionService, private _router : Router) {}

 modules;

 ngOnInit(): void {
   this._permissionService.findAllModules().subscribe(result => {
     this.modules = result;
   })
 }

 updateModule(id){
   this._router.navigate(['/permissions/update-module/'+id]);
 }

 goToModuleLink(link){
   window.location.href = link;
 }

}
