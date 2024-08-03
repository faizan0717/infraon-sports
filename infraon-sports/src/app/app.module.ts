import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { SecretKeyComponent } from './components/secret-key/secret-key.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TeamsComponent,
    MatchesComponent,
    SecretKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB8mSKNJBpJ2Yr_6YP6m5FSTLZHS3C63Zo",
      authDomain: "infraon-sports.firebaseapp.com",
      projectId: "infraon-sports",
      storageBucket: "infraon-sports.appspot.com",
      messagingSenderId: "74086632111",
      appId: "1:74086632111:web:7486b31ed85c4d343f625a"
    }),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
