import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {convertFromStringToArrayWithCommaSeparator} from '../../utils/formDataFunction';

@Component({
  selector: 'app-reject-variation',
  templateUrl: './reject-variation.component.html',
  styleUrls: ['./reject-variation.component.css']
})
export class RejectVariationComponent implements OnInit {

  rejectedVariationListRequests;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  whichVariation;

  constructor(private getService: FormService, private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.whichVariation = this.route.snapshot.routeConfig.path;

    this.getVariationRejectList();
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }

  onClosedErrorAlert() {
    setTimeout(() => {
      this.alertErrorNotificationStatus = false;
    }, 2000);
  }

  getVariationRejectList() {
    this.getService.getRejectedVariationProductsList(this.whichVariation).subscribe((res: any) => {
      res.map(item => {
        item.RejectionResons = convertFromStringToArrayWithCommaSeparator(item.RejectionResons);
      });
      this.rejectedVariationListRequests = {
        tableHeader: ['Notification No', 'Saved date', 'Type Of Notification', 'Product English name', 'Product Arabic name', 'Action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }

  alertForSubmitRequest() {
    return {msg: 'You had a successful Delete'};
  }

  onClosed() {
    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 2000);
  }
}

