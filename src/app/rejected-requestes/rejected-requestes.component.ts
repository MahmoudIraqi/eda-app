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
      this.responseForRejectedList = res;
      console.log('res',res)
      this.selectRejectedType('Final');
      this.isLoading = false;
    });
  }

  selectRejectedType(whichType) {
    if (this.responseForRejectedList.length > 0) {
      if (whichType === 'Final') {
        this.typeOfRejectedList = 'Final';
        this.rejectedListRequests = {
          tableHeader: ['Notification', 'Submission date', 'Product English name', 'Product Arabic name', 'Need Action'],
          tableBody: this.responseForRejectedList.filter(x => !x.canAppeld)
        };
      } else if (whichType === 'Appealed') {
        this.typeOfRejectedList = 'Appealed';
        this.rejectedListRequests = {
          tableHeader: ['Notification', 'Submission date', 'Product English name', 'Product Arabic name', 'Need Action'],
          tableBody: this.responseForRejectedList.filter(x => x.canAppeld)
        };
      }
    }
  }

}
