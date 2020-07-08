import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import { NavigationService } from 'src/app/services/navigation.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  @ViewChild(PerfectScrollbarDirective, {static: true}) perfectScrollbar: PerfectScrollbarDirective;

  constructor(
    public navService: NavigationService,private router: Router) {}

  ngOnInit() {
  }

}
