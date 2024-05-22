import { Routes } from '@angular/router';
import {LoginComponent} from "./core/login/login.component";

export const routes: Routes = [
  {path: '', loadComponent:()=>import('./landing-page/landing-page.component').then(mod=>mod.LandingPageComponent), data: {animation: 'LandingPage'}},
  {path: 'login', component: LoginComponent, },

];
