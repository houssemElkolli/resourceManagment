import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/dashboard/users/users.component';
import { ClientsComponent } from './pages/dashboard/clients/clients.component';
import { MessagesComponent } from './pages/dashboard/messages/messages.component';
import { DatePipe } from '@angular/common';
import { EditComponent as UsersEditComponent } from './pages/dashboard/users/edit/edit.component';
import { CreateComponent as UsersCreateComponent } from './pages/dashboard/users/create/create.component';
import { EditComponent as ClientsEditComponent } from './pages/dashboard/clients/edit/edit.component';
import { CreateComponent as ClientsCreateComponent } from './pages/dashboard/clients/create/create.component';
import { EditComponent as MessagesEditComponent } from './pages/dashboard/messages/edit/edit.component';
import { CreateComponent as MessagesCreateComponent } from './pages/dashboard/messages/create/create.component';
import { ErrorValidationMessageComponent } from './components/error-validation-message/error-validation-message.component';
import { SendEmailComponent } from './pages/send-email/send-email.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    ClientsComponent,
    MessagesComponent,
    ClientsEditComponent,
    ClientsCreateComponent,
    MessagesCreateComponent,
    MessagesEditComponent,
    UsersEditComponent,
    UsersCreateComponent,
    ErrorValidationMessageComponent,
    SendEmailComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  exports: [ErrorValidationMessageComponent],
})
export class AppModule {}
