import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from '../services/form.service';
import {ActivatedRoute} from '@angular/router';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-approved-variation',
  templateUrl: './draft-variation.component.html',
  styleUrls: ['./draft-variation.component.css']
})
export class DraftVariationComponent implements OnInit {
  draftVariationListRequests;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  whichVariation;
  @ViewChild('deleteModal') modalDeletedTemplate: TemplateRef<any>;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  modalRequestId: any;

  constructor(private getService: FormService, private route: ActivatedRoute,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.whichVariation = this.route.snapshot.routeConfig.path;

    this.getVariationDraftList();
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

  openDeleteModal(event) {
    this.modalRef = this.modalService.show(this.modalDeletedTemplate, this.modalOptions);

    this.modalRequestId = event;
  }

  removeProduct() {
    this.isLoading = true;

    this.getService.deleteDraftProductRequest(this.modalRequestId).subscribe(res => {
      if (res) {
        this.isLoading = false;
        this.modalRef.hide();

        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.onClosed();

        this.getVariationDraftList();
      }
    }, error => this.handleError(error));
  }

  getVariationDraftList() {
    this.getService.getDraftVariationProductsList(this.whichVariation).subscribe((res: any) => {
      this.draftVariationListRequests = {
        tableHeader: ['Notification No', 'Saved date', 'Type Of License', 'Product English name', 'Product Arabic name', 'Action'],
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
