import {Routes} from '@angular/router';
import {LoginComponent} from "./core/login/login.component";
import {NewUserComponent} from "./core/components/new-user/new-user.component";
import {UpdateUserComponent} from "./core/components/update-user/update-user.component";
import {ScoreComponent} from "./score/score.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./landing-page/landing-page.component').then(mod => mod.LandingPageComponent),
    data: {animation: 'LandingPage'}
  },
  {
    path: 'questionnaire',
    loadComponent: () => import('./questionnaire/questionnaire.component').then(mod => mod.QuestionnaireComponent)
  },
  {path: 'login', component: LoginComponent},
  {path: 'score', component: ScoreComponent},
  {path: 'user/create', component: NewUserComponent},
  {path: 'user/updatepassword', component: UpdateUserComponent},


];
