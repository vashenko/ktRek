import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ManagerComponent } from './components/manager/manager.component';

import {FirebaseService} from './services/firebase.service';
import {SocialAuthService} from './services/social-auth.service';

import { AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment.prod';
import { ManagersListComponent } from './components/managers-list/managers-list.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { RouterModule, Routes} from '@angular/router';
import { OrderedProductsConvertorPipe} from './pipes/array-convertor.pipe';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material';


const routes: Routes = [
  { path: '', redirectTo: 'log-in', pathMatch: 'full' },
  { path: 'log-in', component: SignInComponent},
  { path: 'managers', component: ManagersListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    ManagersListComponent,
    SignInComponent,
    NavbarComponent,
    OrderedProductsConvertorPipe
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [FirebaseService, SocialAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
