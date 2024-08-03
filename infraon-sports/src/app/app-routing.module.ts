import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TeamsComponent } from './components/teams/teams.component';
import { MatchesComponent } from './components/matches/matches.component';
import { SecretKeyComponent } from './components/secret-key/secret-key.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'matches', component: MatchesComponent },
  { path: 'login', component: SecretKeyComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
