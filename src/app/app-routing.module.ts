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
import {TrackReRegistrationRequestComponent} from './track-re-registration-request/track-re-registration-request.component';
import {VariationComponent} from './variation/variation.component';
import {TrackVariationComponent} from './track-variation/track-variation.component';
import {DraftVariationComponent} from './draft-variation/draft-variation.component';
import {ManufacturingCompanyComponent} from './manufacturing-company/manufacturing-company.component';
import {GeneralEnquireiesComponent} from './general-enquireies/general-enquireies.component';
import {TrackGeneralEnquiriesComponent} from './track-general-enquiries/track-general-enquiries.component';
import {BatchFormComponent} from './batch-form/batch-form.component';
import {NotificationListComponent} from './notification-list/notification-list.component';

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
          {path: 'tell_do-variation', component: VariationComponent, data: {animation: 'new-request'}},
          {path: 'tell_do-variation/:notNumber', component: VariationComponent, data: {animation: 'new-request'}},
          {path: 'do_tell-variation', component: VariationComponent, data: {animation: 'new-request'}},
          {path: 'do_tell-variation/:notNumber', component: VariationComponent, data: {animation: 'new-request'}},
          {path: 'general-enquiries', component: GeneralEnquireiesComponent, data: {animation: 'new-request'}},
        ]
      },
      {
        path: 'track-request', component: TrackRequestContainerComponent,
        children: [
          {path: 'registration', component: TrackRequestComponent, data: {animation: 'track-request'}},
          {path: 're-registration', component: TrackReRegistrationRequestComponent, data: {animation: 'track-request'}},
          {path: 'tell_do-variation', component: TrackVariationComponent, data: {animation: 'track-request'}},
          {path: 'do_tell-variation', component: TrackVariationComponent, data: {animation: 'track-request'}},
          {path: 'general-enquiries', component: TrackGeneralEnquiriesComponent, data: {animation: 'track-request'}}
        ]
      },
      {
        path: 'draft-request', component: DraftRequestsContainerComponent,
        children: [
          {path: 'registration', component: DraftRequestComponent, data: {animation: 'draft-request'}},
          {path: 'tell_do-variation', component: DraftVariationComponent, data: {animation: 'draft-request'}},
          {path: 'do_tell-variation', component: DraftVariationComponent, data: {animation: 'draft-request'}},
        ]
      },
      {
        path: 'admin', component: DraftRequestsContainerComponent,
        children: [
          {path: 'manufacturing-company', component: ManufacturingCompanyComponent, data: {animation: 'admin'}},
          {path: 'adding-batch', component: BatchFormComponent, data: {animation: 'admin'}},
        ]
      },
      {path: 'approved-product', component: ApprovedRequestComponent, data: {animation: 'approved-product'}},
      {path: 'rejected-product', component: RejectedRequestesComponent, data: {animation: 'rejected-request'}},
      {path: 'notification-list', component: NotificationListComponent, data: {animation: 'notification-list'}}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
