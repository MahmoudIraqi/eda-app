import { Component, OnInit } from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-track-re-registration-request',
  templateUrl: './track-re-registration-request.component.html',
  styleUrls: ['./track-re-registration-request.component.css']
})
export class TrackReRegistrationRequestComponent implements OnInit {

  trackReRegistrationListRequests;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getTrackReRegistrationRequestsList().subscribe((res: any) => {
      this.trackReRegistrationListRequests = {
        tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type'],
        tableBody: res
      };
      this.isLoading = false;
    });
  }

}
