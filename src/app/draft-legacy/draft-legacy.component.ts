import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormService} from '../services/form.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-draft-legacy',
  templateUrl: './draft-legacy.component.html',
  styleUrls: ['./draft-legacy.component.css']
})
export class DraftLegacyComponent implements OnInit {

  draftLegacyListRequests;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
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

    this.getDraftLegacy();
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
    this.getService.deleteDraftProductLegacyRequest(this.modalRequestId).subscribe(res => {

      if (res) {
        this.isLoading = false;
        this.modalRef.hide();

        this.alertNotificationStatus = true;
        this.alertNotification = this.alertForSubmitRequest();
        this.onClosed();

        this.getDraftLegacy();

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

  getDraftLegacy() {
    this.getService.getDraftLegacyProductsList().subscribe((res: any) => {

      this.draftLegacyListRequests = {
        tableHeader: ['Old Notification Number', 'Saved date', 'Product English name', 'Track Type', 'Action'],
        tableBody: res
      };
      this.isLoading = false;
    }, error => this.handleError(error));
  }
}
