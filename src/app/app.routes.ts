import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FeedComponent } from './feed/feed.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'feed',
    component: FeedComponent,
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'prefix',
  },
];
