import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { StoriesComponent } from './components/stories/stories.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  // { path: '', redirectTo: '/top', pathMatch: 'full', data: {feedType: 'home'} },
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: 'top', component: StoriesComponent, data: {feedType: 'top'}},
  { path: 'new', component: StoriesComponent, data: {feedType: 'new'} },
  { path: 'show', component: StoriesComponent, data: {feedType: 'show'} },
  { path: 'ask', component: StoriesComponent, data: {feedType: 'ask'} },
  { path: 'error', component: ErrorComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
