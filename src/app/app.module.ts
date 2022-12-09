import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

import { registerLocaleData } from '@angular/common';
import * as be from '@angular/common/locales/be';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './input/input.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';
import { NotificationComponent } from './notification/notification.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateCourseComponent } from './create-course/create-course.component';
import { SelectInFormComponent } from './select-in-form/select-in-form.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { TextareaInFormComponent } from './textarea-in-form/textarea-in-form.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InputComponent,
    HomeComponent,
    NavbarComponent,
    RegisterComponent,
    NotificationComponent,
    AppointmentComponent,
    CreateCourseComponent,
    SelectInFormComponent,
    InputNumberComponent,
    TextareaInFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'fr-BE'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(){
    registerLocaleData(be.default);
  }
}
