import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/public/login/login.component';

import { registerLocaleData } from '@angular/common';
import * as be from '@angular/common/locales/be';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { HomeComponent } from './pages/public/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './pages/public/register/register.component';
import { NotificationComponent } from './pages/users/notification/notification.component';
import { AppointmentComponent } from './pages/users/appointment/appointment.component';
import { CreateCourseComponent } from './pages/users/create-course/create-course.component';
import { SelectInFormComponent } from './components/select-in-form/select-in-form.component';
import { InputNumberComponent } from './components/input-number/input-number.component';
import { TextareaInFormComponent } from './components/textarea-in-form/textarea-in-form.component';
import { MyCoursesComponent } from './pages/users/my-courses/my-courses.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { CanActivateViaNotAuthenticationGuard } from './guards/CanActivateViaNotAuthentication.guard';
import { LogoutComponent } from './pages/users/logout/logout.component';
import { SubmitButtonComponent } from "./components/submit-button/submit-button.component";
import { CourseDetailsComponent } from './pages/users/course-details/course-details.component';
import { LevelBubblesComponent } from './components/level-bubbles/level-bubbles.component';
import { FavoriteComponent } from './pages/users/favorites/favorite.component';
import { RatingsPageComponent } from './pages/public/ratings-page/ratings-page.component';
import { StarsRatingDisplayComponent } from './components/stars-rating-display/stars-rating-display.component';
import { RatingComponent } from './components/rating/rating.component';

import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { CanActivateViaAuthenticationGuard } from './guards/CanActivateViaAuthentication.guard';
import { ProfileComponent } from './pages/public/profile/profile.component';
import { InputStarsComponent } from './components/input-stars/input-stars.component';
import { FavoriteButtonComponent } from './components/favorite-button/favorite-button.component';


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
        TextareaInFormComponent,
        MyCoursesComponent,
        CourseCardComponent,
        LogoutComponent,
        SubmitButtonComponent,
        CourseDetailsComponent,
        LevelBubblesComponent,
        FavoriteComponent,
        RatingsPageComponent,
        StarsRatingDisplayComponent,
        RatingComponent,
        CustomCurrencyPipe,
        ProfileComponent,
        InputStarsComponent,
        FavoriteButtonComponent
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-BE' }, CanActivateViaNotAuthenticationGuard, CanActivateViaAuthenticationGuard
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        // import HttpClientModule after BrowserModule.
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class AppModule { 
  constructor(){
    registerLocaleData(be.default);
  }
}
