import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";

export const routes: Routes = [
  {path: '', loadComponent:()=>import('./landing-page/landing-page.component').then(mod=>mod.LandingPageComponent), data: {animation: 'LandingPage'}},];
