import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomepageComponent} from './homepage/homepage.component';
import {NewRequestComponent} from './new-request/new-request.component';
import {TrackRequestComponent} from './track-request/track-request.component';
import {DraftRequestComponent} from './draft-request/draft-request.component';
import {ApprovedRequestComponent} from './approved-request/approved-request.component';
import {TableListComponent} from './shared-components/table-list/table-list.component';
import {TitleComponent} from './shared-components/title/title.component';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {AccordionModule} from 'ngx-bootstrap/accordion';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AlertModule} from 'ngx-bootstrap/alert';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProductRequestFormComponent} from './product-request-form/product-request-form.component';
import {ProductsKitRequestFormComponent} from './products-kit-request-form/products-kit-request-form.component';
import {ProductsHairColourRequestFormComponent} from './products-hair-colour-request-form/products-hair-colour-request-form.component';
import {ProductsKitHairColourRequestFormComponent} from './products-kit-hair-colour-request-form/products-kit-hair-colour-request-form.component';
import {DatePipe, DecimalPipe} from '@angular/common';
import {FormService} from './services/form.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {MatCardModule} from '@angular/material/card';
import { HomeContainerComponent } from './home-container/home-container.component';

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
    TitleComponent,
    ProductRequestFormComponent,
    ProductsKitRequestFormComponent,
    ProductsHairColourRequestFormComponent,
    ProductsKitHairColourRequestFormComponent,
    LoginComponent,
    HomeContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule
  ],
  providers: [DecimalPipe, DatePipe, FormService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
