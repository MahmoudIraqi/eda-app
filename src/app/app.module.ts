import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { TrackRequestComponent } from './track-request/track-request.component';
import { DraftRequestComponent } from './draft-request/draft-request.component';
import { ApprovedRequestComponent } from './approved-request/approved-request.component';
import { TableListComponent } from './shared-components/table-list/table-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    NewRequestComponent,
    TrackRequestComponent,
    DraftRequestComponent,
    ApprovedRequestComponent,
    TableListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
