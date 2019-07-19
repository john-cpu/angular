import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CarFormComponent} from './CarForm/carForm.component';
import {MtableComponent} from './mtable/mtable.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: 'register', component: CarFormComponent},
  { path: 'carMsg', component: MtableComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component: MtableComponent},
  { path: '**', component: LoginComponent}
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
