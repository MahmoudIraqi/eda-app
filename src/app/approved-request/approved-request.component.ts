import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-approved-request',
  templateUrl: './approved-request.component.html',
  styleUrls: ['./approved-request.component.css']
})
export class ApprovedRequestComponent implements OnInit {

  approvedListRequests = {
    tableHeader: ['Notification', 'Submission date', 'Product English name', 'Product Arabic name', 'Need Action'],
    tableBody: []
  };

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.getService.getApprovedProductsList().subscribe((res: any) => {
      this.approvedListRequests.tableBody = res;
    });
  }

}
