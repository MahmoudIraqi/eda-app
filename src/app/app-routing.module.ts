import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './homepage/homepage.component';
import {NewRequestComponent} from './new-request/new-request.component';
import {TrackRequestComponent} from './track-request/track-request.component';
import {DraftRequestComponent} from './draft-request/draft-request.component';
import {ApprovedRequestComponent} from './approved-request/approved-request.component';
import {LoginComponent} from './login/login.component';
import {HomeContainerComponent} from './home-container/home-container.component';
import {NewRequestContainerComponent} from './new-request-container/new-request-container.component';
import {TrackRequestContainerComponent} from './track-request-container/track-request-container.component';
import {DraftRequestsContainerComponent} from './draft-requests-container/draft-requests-container.component';
import {ReRegistrationComponent} from './re-registration/re-registration.component';
import {RejectedRequestesComponent} from './rejected-requestes/rejected-requestes.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent, data: {animation: 'login'}},
  {
    path: '', component: HomeContainerComponent, children: [
      {path: 'home', component: HomepageComponent, data: {animation: 'home'}},
      {
        path: 'new-request', component: NewRequestContainerComponent,
        children: [
          {path: 'registration', component: NewRequestComponent, data: {animation: 'new-request'}},
          {path: 'registration/:id', component: NewRequestComponent, data: {animation: 'new-request'}},
          {path: 'reregistration', component: ReRegistrationComponent, data: {animation: 'new-request'}},
        ]
      },
      {
        path: 'track-request', component: TrackRequestContainerComponent,
        children: [
          {path: 'registration', component: TrackRequestComponent, data: {animation: 'track-request'}}
        ]
      },
      {
        path: 'draft-request', component: DraftRequestsContainerComponent,
        children: [
          {path: 'registration', component: DraftRequestComponent, data: {animation: 'draft-request'}}
        ]
      },
      {path: 'approved-request', component: ApprovedRequestComponent, data: {animation: 'approved-request'}},
      {path: 'rejected-request', component: RejectedRequestesComponent, data: {animation: 'rejected-request'}},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
