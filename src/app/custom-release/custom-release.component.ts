import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import {LookupState} from '../product-request-form/product-request-form.component';
import {Observable, Subscription} from 'rxjs';
import {MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {convertToSpecialObject} from '../../utils/formDataFunction';
import {TabsetComponent} from 'ngx-bootstrap/tabs';
import {InputService} from '../services/input.service';

@Component({
  selector: 'app-custom-release',
  templateUrl: './custom-release.component.html',
  styleUrls: ['./custom-release.component.css']
})
export class CustomReleaseComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
