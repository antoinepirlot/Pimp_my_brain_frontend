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
import { ChatComponent } from './pages/users/chat/chat.component';
import { RatingsPageComponent } from './pages/users/ratings-page/ratings-page.component';
import { StarsRatingDisplayComponent } from './components/stars-rating-display/stars-rating-display.component';
import { RatingComponent } from './components/rating/rating.component';
import { RoomComponent } from './pages/users/room/room.component';
import { AppointmentCreateComponent } from './pages/users/appointment-create/appointment-create.component';

import { CustomCurrencyPipe } from './pipes/custom-currency.pipe';
import { CanActivateViaAuthenticationGuard } from './guards/CanActivateViaAuthentication.guard';
import { AppointmentDetailsComponent } from './pages/users/appointment-details/appointment-details.component';

import { ProfileComponent } from './pages/users/profile/profile.component';
import { InputStarsComponent } from './components/input-stars/input-stars.component';
import { FavoriteIconComponent } from './components/favorite-icon/favorite-icon.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environement } from 'src/environement/environement';

const config: SocketIoConfig = { url: environement.ROOT_URL, options: {} };

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
        ChatComponent,
        RatingsPageComponent,
        StarsRatingDisplayComponent,
        RatingComponent,
        CustomCurrencyPipe,
        AppointmentDetailsComponent,
        ProfileComponent,
        InputStarsComponent,
        FavoriteIconComponent,
        RoomComponent,
        AppointmentCreateComponent,
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
        ReactiveFormsModule,
        SocketIoModule.forRoot(config)
    ]
})
export class AppModule { 
  constructor(){
    registerLocaleData(be.default);
  }
}
