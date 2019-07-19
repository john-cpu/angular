import { BrowserModule } from '@angular/platform-browser';
import {Injectable, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {CarFormComponent} from './CarForm/carForm.component';
import {CarServiceService} from './car-service.service';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {MaterialModule} from './material/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatTableModule} from '@angular/material';
import {MatInputModule} from '@angular/material';
import {MyPageUtil} from './Utils/myPage-Util';
import {MtableComponent} from './mtable/mtable.component';
import {routing} from './app.routing';
import { FilterPipe } from './filter.pipe';
import {LoginComponent} from './login/login.component';
import {FileUploadModule} from 'ng2-file-upload';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    CarFormComponent,
    MtableComponent,
    FilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    routing,
    FileUploadModule
  ],
  providers: [{provide: CarServiceService, useClass: CarServiceService}, { provide: MatPaginatorIntl, useClass: MyPageUtil}, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
