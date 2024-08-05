import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/dashboard/messages/messages.component';
import { ClientsComponent } from './pages/dashboard/clients/clients.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { CreateComponent as UsersCreateComponent } from './pages/dashboard/users/create/create.component';
import { EditComponent as UsersEditComponent } from './pages/dashboard/users/edit/edit.component';
import { EditComponent as ClientsEditComponent } from './pages/dashboard/clients/edit/edit.component';
import { EditComponent as MessagesEditComponent } from './pages/dashboard/messages/edit/edit.component';
import { CreateComponent as ClientsCreateComponent } from './pages/dashboard/clients/create/create.component';
import { CreateComponent as MessagesCreateComponent } from './pages/dashboard/messages/create/create.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'clients', component: ClientsComponent },
      { path: 'clients/create', component: ClientsCreateComponent },
      { path: 'clients/:id', component: ClientsEditComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: UsersCreateComponent },
      { path: 'users/:id', component: UsersEditComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'messages/create', component: MessagesCreateComponent },
      { path: 'messages/:id', component: MessagesEditComponent },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
