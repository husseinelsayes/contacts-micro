import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { EmptyComponent } from './pages/empty.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreComponent } from './components/core/core.component';
import { OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { AuthGuard } from './services/auth-guard';
import { InterceptorService } from './services/interceptor.service';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { QuillModule } from 'ngx-quill';
import { FindContactComponent } from './pages/find-contact/find-contact.component';
import { SharedDirectivesModule } from './directives/shared-directives.module';



@NgModule({
  declarations: [
    AppComponent,
    CoreComponent,
    SpinnerComponent,
    EmptyComponent,
    SidebarComponent,
    //
    FindContactComponent
  ],
  imports: [
    SharedDirectivesModule,
    PerfectScrollbarModule,
    //
    NgxEchartsModule,
    NgxDatatableModule,
    NgbModule,
    QuillModule,
    //
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      {path: 'contacts', component : CoreComponent,
        children : [
          {path: 'find', component: FindContactComponent}
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
  }
],
  bootstrap: [],
  entryComponents : [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { 
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const appElement = createCustomElement(AppComponent, { injector: this.injector});
    customElements.define('contacts-app', appElement);
  }

}
