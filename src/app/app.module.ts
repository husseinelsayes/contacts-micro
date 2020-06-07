import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ModuleAddComponent } from './pages/module-add/module-add.component';
import { ModuleUpdateComponent } from './pages/module-update/module-update.component';
import { ModuleListComponent } from './pages/module-list/module-list.component';
import { PermissionAddComponent } from './pages/permission-add/permission-add.component';
import { EmptyComponent } from './pages/empty.component';
import { IconModalComponent } from './components/shared/icon-modal/icon-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreComponent } from './components/core/core.component';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard } from './services/auth-guard';
import { InterceptorService } from './services/interceptor.service';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { DropdownAnchorDirective } from './shared/directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './shared/directives/dropdown-link.directive';
import { AppDropdownDirective } from './shared/directives/dropdown.directive';
import { ScrollToDirective } from './shared/directives/scroll-to.directive';
import { SidebarDirective, SidebarContainerDirective, SidebarContentDirective, SidebarTogglerDirective } from './shared/directives/sidebar.directive';
import { HighlightjsDirective } from './shared/directives/highlightjs.directive';
import { FullScreenWindowDirective } from './shared/directives/full-screen.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SidebarLargeComponent } from './shared/components/layouts/admin-layout-sidebar-large/sidebar-large/sidebar-large.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const directives = [
  DropdownAnchorDirective,
  DropdownLinkDirective,
  AppDropdownDirective,
  ScrollToDirective,
  SidebarDirective,
  SidebarContainerDirective,
  SidebarContentDirective,
  SidebarTogglerDirective,
  HighlightjsDirective,
  FullScreenWindowDirective
];


@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    SpinnerComponent,
    IconModalComponent,
    EmptyComponent,
    ModuleAddComponent,
    ModuleUpdateComponent,
    ModuleListComponent,
    PermissionAddComponent,
    directives,
    SidebarComponent
  ],
  imports: [
    PerfectScrollbarModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'permissions', component : CoreComponent,
        children : [
            {path: 'add-module', component: ModuleAddComponent},
            {path: 'update-module/:id', component: ModuleUpdateComponent},
            {path: 'module-list', component: ModuleListComponent},
            {path: 'add-permission', component: PermissionAddComponent}
        ]
      },{path : '**', component : EmptyComponent}
    ], { useHash: true }),
    OAuthModule.forRoot(),
  ],
  providers: [
    OAuthService,
    AuthGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [],
  entryComponents : [IconModalComponent, AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { 
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, { injector: this.injector});
    customElements.define('permission-app', appElement);
  }
}
