import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSerieComponent } from './components/list-serie/list-serie.component';
import { SerieComponent } from './components/serie/serie.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ManagementComponent } from './components/management/management.component';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';

const routes: Routes = [
  { path: '', component: ListSerieComponent },
  { path: 'serie/:variable', component: SerieComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'management', component: ManagementComponent, canActivate: [AuthGuard], data: {roles: [Role.admin]} },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }