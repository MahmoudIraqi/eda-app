import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-track-request',
  templateUrl: './track-request.component.html',
  styleUrls: ['./track-request.component.css']
})
export class TrackRequestComponent implements OnInit {


  trackListRequests = {
    tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type'],
    tableBody: []
  };

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.getService.getTrackRequestsList().subscribe((res: any) => {
      console.log('res', res);
      this.trackListRequests.tableBody = res;
    });
  }

}
