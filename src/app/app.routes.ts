import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Tasks } from './pages/tasks/tasks';
import { authGuard } from './guards/auth-guard';
import { Perfil } from './pages/perfil/perfil';
import { HomeComponet } from './pages/home.componet/home.componet';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'tasks', component: Tasks, canActivate: [authGuard] },
  { path: 'perfil', component: Perfil, canActivate: [authGuard] },
  { path: 'home', component: HomeComponet },
];
