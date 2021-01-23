import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-draft-request',
  templateUrl: './draft-request.component.html',
  styleUrls: ['./draft-request.component.css']
})
export class DraftRequestComponent implements OnInit {

  draftListRequests = {
    tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type', 'Action'],
    tableBody: []
  };

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.getService.getDraftRequestsList().subscribe((res: any) => {
      this.draftListRequests.tableBody = res;
    });
  }

}
