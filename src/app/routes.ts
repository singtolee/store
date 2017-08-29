import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ConsoleComponent } from './console/console.component';
import { UploadComponent } from './upload/upload.component';
import { AddressesComponent } from './addresses/addresses.component';

import { AuthService } from './auth.service';

export const router:Routes=[
  { path:'',redirectTo: 'console', pathMatch: 'full'},
  {path:'console', component: ConsoleComponent, canActivate:[AuthService]},
  {path:'login', component: LoginComponent},
  {path:'upload', component:UploadComponent, canActivate:[AuthService]},
  {path:'addresses', component:AddressesComponent, canActivate:[AuthService]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);