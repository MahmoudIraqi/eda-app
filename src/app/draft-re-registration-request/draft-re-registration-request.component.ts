import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from '../services/form.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-draft-re-registration-request',
  templateUrl: './draft-re-registration-request.component.html',
  styleUrls: ['./draft-re-registration-request.component.css']
})
export class DraftReRegistrationRequestComponent implements OnInit {
  draftReRegistrationListRequests;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  @ViewChild('deleteModal') modalDeletedTemplate: TemplateRef<any>;
  modalRef: BsModalRef;
  modalOptions: ModalOptions = {
    backdrop: 'static',
    keyboard: false,
    class: 'modal-xl packagingModal',
  };
  modalRequestId: any;

  constructor(private getService: FormService,
              private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.getDraftProductsList();
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

  getDraftProductsList() {
    this.getService.getDraftReRegistrationRequestsList().subscribe((res: any) => {
      this.draftReRegistrationListRequests = {
        tableHeader: ['Notification Number', 'Submission date', 'Type Of Notification', 'Product English name', 'Product Arabic name', 'Status'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
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

        this.getDraftProductsList();

      }
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
