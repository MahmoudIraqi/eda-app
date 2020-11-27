import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { TrackRequestComponent } from './track-request/track-request.component';
import { DraftRequestComponent } from './draft-request/draft-request.component';
import { ApprovedRequestComponent } from './approved-request/approved-request.component';
import { TableListComponent } from './shared-components/table-list/table-list.component';
import { TitleComponent } from './shared-components/title/title.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {MatExpansionModule} from '@angular/material/expansion';


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
    TableListComponent,
    TitleComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
