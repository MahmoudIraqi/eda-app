import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {NewRequestComponent} from './new-request/new-request.component';
import {TrackRequestComponent} from './track-request/track-request.component';
import {DraftRequestComponent} from './draft-request/draft-request.component';
import {ApprovedRequestComponent} from './approved-request/approved-request.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home'},
  {path: 'home', component: HomepageComponent, data: {animation: 'home'}},
  {path: 'new-request', component: NewRequestComponent, data: {animation: 'new-request'}},
  {path: 'track-request', component: TrackRequestComponent, data: {animation: 'track-request'}},
  {path: 'draft-request', component: DraftRequestComponent, data: {animation: 'draft-request'}},
  {path: 'approved-request', component: ApprovedRequestComponent, data: {animation: 'approved-request'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
