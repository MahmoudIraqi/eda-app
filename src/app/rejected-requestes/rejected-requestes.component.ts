import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-rejected-requestes',
  templateUrl: './rejected-requestes.component.html',
  styleUrls: ['./rejected-requestes.component.css']
})
export class RejectedRequestesComponent implements OnInit {

  rejectedListRequests;
  responseForRejectedList = [];
  typeOfRejectedList;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getRejectedProductsList().subscribe((res: any) => {
      this.rejectedListRequests = {
        tableHeader: ['Notification', 'Submission date', 'Type Of Notification', 'Product English name', 'Type Of Request', 'Status', 'Track Type', 'Action'],
        tableBody: res
      };
      this.isLoading = false;
    });
  }

}
