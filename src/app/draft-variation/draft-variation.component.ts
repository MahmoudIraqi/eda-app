import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-approved-variation',
  templateUrl: './draft-variation.component.html',
  styleUrls: ['./draft-variation.component.css']
})
export class DraftVariationComponent implements OnInit {
  draftVariationListRequests;
  isLoading: boolean = false;

  constructor(private getService: FormService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getService.getDraftVariationProductsList().subscribe((res: any) => {
      this.draftVariationListRequests = {
        tableHeader: ['Request id', 'Submission date', 'Product English name', 'Product Arabic name', 'Status', 'Track Type'],
        tableBody: res
      };
      this.isLoading = false;
    });
  }
}
