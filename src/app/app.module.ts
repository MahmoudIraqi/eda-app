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
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {ModalModule} from 'ngx-bootstrap/modal';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {AlertModule} from 'ngx-bootstrap/alert';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ProductRequestFormComponent} from './product-request-form/product-request-form.component';
import {ProductsKitRequestFormComponent} from './products-kit-request-form/products-kit-request-form.component';
import {ProductsHairColourRequestFormComponent} from './products-hair-colour-request-form/products-hair-colour-request-form.component';
import {ProductsKitHairColourRequestFormComponent} from './products-kit-hair-colour-request-form/products-kit-hair-colour-request-form.component';
import {CurrencyPipe, DatePipe, DecimalPipe} from '@angular/common';
import {FormService} from './services/form.service';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {HomeContainerComponent} from './home-container/home-container.component';
import {LoaderComponentComponent} from './shared-components/loader-component/loader-component.component';
import {FiltersComponent} from './shared-components/filters/filters.component';
import {NewRequestContainerComponent} from './new-request-container/new-request-container.component';
import {TrackRequestContainerComponent} from './track-request-container/track-request-container.component';
import {DraftRequestsContainerComponent} from './draft-requests-container/draft-requests-container.component';
import {ReRegistrationComponent} from './re-registration/re-registration.component';
import {RejectedRequestesComponent} from './rejected-requestes/rejected-requestes.component';
import {TrackReRegistrationRequestComponent} from './track-re-registration-request/track-re-registration-request.component';
import {VariationComponent} from './variation/variation.component';
import {TrackVariationComponent} from './track-variation/track-variation.component';
import {DraftVariationComponent} from './draft-variation/draft-variation.component';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ManufacturingCompanyComponent} from './manufacturing-company/manufacturing-company.component';
import {GeneralEnquireiesComponent} from './general-enquireies/general-enquireies.component';
import {TrackGeneralEnquiriesComponent} from './track-general-enquiries/track-general-enquiries.component';
import {BatchFormComponent} from './batch-form/batch-form.component';
import {NotificationListComponent} from './notification-list/notification-list.component';
import {CustomReleaseComponent} from './custom-release/custom-release.component';
import {TestCustomReleaseComponent} from './test-custom-release/test-custom-release.component';
import {InspectionComponent} from './inspection/inspection.component';
import {InspectionFinalProductComponent} from './inspection-final-product/inspection-final-product.component';
import {CompletionTheLabComponent} from './completion-the-lab/completion-the-lab.component';
import {LegacyComponent} from './legacy/legacy.component';
import {LegacyProductsComponent} from './legacy-products/legacy-products.component';
import {TrackLegacyComponent} from './track-legacy/track-legacy.component';
import {DraftLegacyComponent} from './draft-legacy/draft-legacy.component';
import { InsertProductForKitComponent } from './insert-product-for-kit/insert-product-for-kit.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    LoaderComponentComponent,
    FiltersComponent,
    NewRequestContainerComponent,
    TrackRequestContainerComponent,
    DraftRequestsContainerComponent,
    ReRegistrationComponent,
    RejectedRequestesComponent,
    TrackReRegistrationRequestComponent,
    VariationComponent,
    TrackVariationComponent,
    DraftVariationComponent,
    ManufacturingCompanyComponent,
    GeneralEnquireiesComponent,
    TrackGeneralEnquiriesComponent,
    BatchFormComponent,
    NotificationListComponent,
    CustomReleaseComponent,
    TestCustomReleaseComponent,
    InspectionComponent,
    InspectionFinalProductComponent,
    CompletionTheLabComponent,
    LegacyComponent,
    LegacyProductsComponent,
    TrackLegacyComponent,
    DraftLegacyComponent,
    InsertProductForKitComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    MatExpansionModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatNativeDateModule
  ],
  providers: [DecimalPipe, DatePipe, FormService, CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
