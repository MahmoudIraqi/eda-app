import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {convertFromStringToArrayWithCommaSeparator} from '../../utils/formDataFunction';

@Component({
  selector: 'app-expired-products',
  templateUrl: './expired-products.component.html',
  styleUrls: ['./expired-products.component.css']
})
export class ExpiredProductsComponent implements OnInit {

  expiredListRequests;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getService.getExpiredProductsList().subscribe((res: any) => {
      this.expiredListRequests = {
        tableHeader: ['Notification', 'Submission date', 'Type Of Notification', 'Product English name', 'Type Of Request', 'Status', 'Track Type', 'Action'],
        tableBody: res
      };
      this.isLoading = false;
    });
  }
}
