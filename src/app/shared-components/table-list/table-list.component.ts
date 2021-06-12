import {Component, OnInit, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {ActivatedRoute, Router} from '@angular/router';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {Observable} from 'rxjs';
import {InputService} from '../../services/input.service';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() whichTable;
  step;
  sortByForRequestNumber = [
    {
      id: 'descending',
      value: 'Descending '
    },
    {
      id: 'ascending',
      value: 'Ascending '
    }
  ];
  dataAfterFilters = [];
  filterData = {
    filterKey: []
  };
  filterRow = [];
  keyForFilter;
  keyWordsForFilter;
  staticFilterKey = {
    'Request Number': 'ID',
    'Submission date': 'SubmmittionDate',
    'Saved date': 'SubmmittionDate',
    'Product English name': 'NameEN',
    'Product Arabic name': 'NameAR',
    'Status': 'Status',
    'Track Type': 'Track_type',
    'Notification': 'NotificationNo',
    'Batch Number': 'batchNumber',
    'Production Date': 'productionDate',
    'Expiration Date': 'expirationDate',
    'Type Of Notification': 'productTypeName',
  };
  sortStatus = false;
  alertNotificationStatus: boolean = false;

  filteredData: Observable<any[]>;


  @Input() removeFilterKey;
  @Output() removeDetailsRowOutput = new EventEmitter();
  @Output() removeDetailsRowIDs = new EventEmitter();
  @Output() removePackagingRowOutput = new EventEmitter();
  @Output() removePackagingRowIDs = new EventEmitter();
  @Output() editPackagingRowIDs = new EventEmitter();
  @Output() removeIngrediantDetailsRowOutput = new EventEmitter();
  @Output() removeIngrediantDetailsIDs = new EventEmitter();
  @Output() removeIngrediantRowOutput = new EventEmitter();
  @Output() editIngrediantRowOutput = new EventEmitter();
  @Output() removeProductFromKit = new EventEmitter();
  @Output() editDetailedRowOutput = new EventEmitter();
  @Output() seenNotification = new EventEmitter();
  @Output() editProductInInvoicesRows = new EventEmitter();
  @Output() removeProductInInvoicesRows = new EventEmitter();
  @Output() removeDraftProduct = new EventEmitter();

  contentArray = [];
  returnedArray: string[];
  deletedIdsListForPackaging = [];
  deletedIdsListForDetailsRow = [];
  deletedIdsListForIngrediant = [];
  noDataStatment = 'There is no data ...';

  constructor(private router: Router, private route: ActivatedRoute, private inputService: InputService) {
  }

  ngOnChanges() {
    if (this.data) {
      if (this.data.tableBody.length > 0) {
        if (this.whichTable !== 'newRequestForDetails' && this.whichTable !== 'newRequestForPackaging' && this.whichTable !== 'productsKitList' && this.whichTable !== 'trackGeneralEnquiries' && this.whichTable !== 'newIngrediantTable' && this.whichTable !== 'newProductForInvoice') {
          if (this.whichTable !== 'manufacturing' && this.whichTable !== 'batchTable' && this.whichTable !== 'notificationList') {
            this.data.tableBody.sort((a, b) => (a.ID > b.ID) ? -1 : 1);
            this.data.tableBody.map(x => {
              x.ID = x.ID ? x.ID.toString() : null;
              x.NotificationNo = x.NotificationNo ? x.NotificationNo.toString() : '';
              x.oldNotificationNo = x.oldNotificationNo ? x.oldNotificationNo.toString() : '';
            });
          }
          if (this.whichTable === 'batchTable') {
            this.data.tableBody.map(x => {
              x.productID = x.productID.toString();
            });
          }
          const tableColumnID = Object.keys(this.data.tableBody[0]).map((x, i) => x);
          this.filterData.filterKey = [];

          this.data.tableHeader.map((x, i) => {
            if (this.staticFilterKey[this.data.tableHeader[i]]) {

              this.filterData.filterKey.push({
                name: this.data.tableHeader[i],
                id: this.staticFilterKey[this.data.tableHeader[i]]
              });
            }
          });

          this.contentArray = new Array(this.data.tableBody.length).fill('');
          this.contentArray = this.contentArray.map((v: string, i: number) => this.data.tableBody[i]);
          this.returnedArray = this.contentArray.slice(0, 10);
        }
      }
    }
  }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  sortBy(status, columnName) {
    this.contentArray = [];
    this.returnedArray = [];

    this.sortStatus = !status;
    if (!this.sortStatus) {
      this.data.tableBody = this.data.tableBody.sort((a, b) => (a[this.staticFilterKey[columnName]].toLowerCase() > b[this.staticFilterKey[columnName]].toLowerCase()) ? 1 : -1);
    } else if (this.sortStatus) {
      this.data.tableBody = this.data.tableBody.sort((a, b) => (a[this.staticFilterKey[columnName]].toLowerCase() < b[this.staticFilterKey[columnName]].toLowerCase()) ? 1 : -1);
    }

    this.contentArray = new Array(this.data.tableBody.length).fill('');
    this.contentArray = this.contentArray.map((v: string, i: number) => this.data.tableBody[i]);
    this.returnedArray = this.contentArray.slice(0, 10);
  }

  removeDetailsRowFunction(i, requestID) {
    this.removeDetailsRowOutput.emit(i);

    if (requestID) {
      this.deletedIdsListForDetailsRow.push(requestID);
      this.removeDetailsRowIDs.emit(this.deletedIdsListForDetailsRow);
    }
  }

  removePackagingRowFunction(i, requestID) {
    this.removePackagingRowOutput.emit(i);

    if (requestID) {
      this.deletedIdsListForPackaging.push(requestID);
      this.removePackagingRowIDs.emit(this.deletedIdsListForPackaging);
    }
  }

  editPackagingRowFunction(i) {
    this.editPackagingRowIDs.emit(i);
  }

  removeIngrediantDetailsRowFunction(childIndex, i, indexRow, idRequest) {
    this.removeIngrediantDetailsRowOutput.emit({childIndex, indexRow, i});

    if (idRequest) {
      this.deletedIdsListForIngrediant.push(idRequest);
      this.removeIngrediantDetailsIDs.emit(this.deletedIdsListForIngrediant);
    }
  }

  removeIngrediantDetailsRows(index) {
    this.removeIngrediantRowOutput.emit(index);
  }

  editIngrediantDetailsRows(index) {
    this.editIngrediantRowOutput.emit(index);
  }

  removeProductInInvoicesRowsFunction(index) {
    this.removeProductInInvoicesRows.emit(index);
  }

  editProductInInvoicesRowsFunction(index) {
    this.editProductInInvoicesRows.emit(index);
  }

  removeProductFromKitFunction(index) {
    this.removeProductFromKit.emit(index);
  }

  editDetailedRowFunction(i) {
    this.editDetailedRowOutput.emit(i);
  }

  setTheFilteredData(event) {
    if (event.keyForFilter.id) {
      if (event.filterRow.length > 0) {
        if (event.keyWordsForFilter) {
          if (event.keyForFilter.id === 'SubmmittionDate' || event.keyForFilter.id === 'productionDate' || event.keyForFilter.id === 'expirationDate') {
            this.dataAfterFilters.map(x => x[event.keyForFilter.id] = new Date(x[event.keyForFilter.id]).toDateString());
            if (this.dataAfterFilters.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString()).length > 0) {
              this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString());
            } else {
              this.showAlertForFailedAlert();
            }
          } else {
            if (this.dataAfterFilters.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase())).length > 0) {
              this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase()));
            } else {
              this.showAlertForFailedAlert();
            }
          }
        } else {
          event.filterRow.map((x, i) => {
            if (i === 0) {
              if (this.staticFilterKey[x.columnName] === 'SubmmittionDate' || this.staticFilterKey[x.columnName] === 'productionDate' || this.staticFilterKey[x.columnName] === 'expirationDate') {
                this.data.tableBody.map(y => y[this.staticFilterKey[x.columnName]] = new Date(y[this.staticFilterKey[x.columnName]]).toDateString());
                if (this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString()).length > 0) {
                  this.dataAfterFilters = this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString());
                } else {
                  this.showAlertForFailedAlert();
                }
              } else {
                if (this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase())).length > 0) {
                  this.dataAfterFilters = this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase()));
                } else {
                  this.showAlertForFailedAlert();
                }
              }
            } else {
              if (this.staticFilterKey[x.columnName] === 'SubmmittionDate' || this.staticFilterKey[x.columnName] === 'productionDate' || this.staticFilterKey[x.columnName] === 'expirationDate') {
                this.dataAfterFilters.map(y => y[this.staticFilterKey[x.columnName]] = new Date(y[this.staticFilterKey[x.columnName]]).toDateString());
                if (this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString()).length > 0) {
                  this.dataAfterFilters = this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString());
                } else {
                  this.showAlertForFailedAlert();
                }
              } else {
                if (this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase())).length > 0) {
                  this.dataAfterFilters = this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] && y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase()));
                } else {
                  this.showAlertForFailedAlert();
                }
              }
            }
          });
        }
      } else {
        if (event.keyWordsForFilter) {
          if (event.keyForFilter.id === 'SubmmittionDate' || event.keyForFilter.id === 'productionDate' || event.keyForFilter.id === 'expirationDate') {
            this.data.tableBody.map(x => x[event.keyForFilter.id] = new Date(x[event.keyForFilter.id]).toDateString());
            if (this.data.tableBody.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString()).length > 0) {
              this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString());
            } else {
              this.showAlertForFailedAlert();
            }
          } else {
            if (this.data.tableBody.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase())).length > 0) {
              this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id] && x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase()));
            } else {
              this.showAlertForFailedAlert();
            }
          }
        } else {
          this.dataAfterFilters = [];
        }
      }
    }

    this.contentArray = new Array(this.dataAfterFilters.length > 0 ? this.dataAfterFilters.length : this.data.tableBody.length).fill('');
    this.contentArray = this.contentArray.map((v: string, i: number) => this.dataAfterFilters.length > 0 ? this.dataAfterFilters[i] : this.data.tableBody[i]);
    this.returnedArray = this.contentArray.slice(0, 10);
  }

  showAlertForFailedAlert() {
    this.alertNotificationStatus = true;

    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 3000);
  }

  editProduct(request) {
    const isTrackProduct = this.route.snapshot.routeConfig.data.animation;
    const editFrom = this.route.snapshot.routeConfig.path;
    if (editFrom === 'tell_do_variation') {
      this.router.navigate([`/new-request/tell_do_variation/${Number(request.ID)}`]);
    } else if (editFrom === 'do_tell_variation') {
      this.router.navigate([`/new-request/do_tell_variation/${Number(request.ID)}`]);
    } else if (editFrom === 'registration') {
      this.router.navigate([`/new-request/registration/${Number(request.ID)}/${isTrackProduct === 'track-request' ? 'Track' : 'Request'}`]);
    } else if (editFrom === 'legacy-products') {
      this.router.navigate([`/legacy-form/${Number(request.oldProductID)}`]);
    } else if (editFrom === 'legacy') {
      this.router.navigate([`/legacy-form/${Number(request.OLD_PRODUCT_ID)}`]);
    } else if (editFrom === 'approved-product') {
      this.router.navigate([`/new-request/registration/${Number(request.ID)}/Approved`]);
    }
  }

  deleteProduct(request) {
    const editFrom = this.route.snapshot.routeConfig.path;
    if (editFrom === 'tell_do_variation') {
      this.removeDraftProduct.emit(request.NotificationNo);
    } else if (editFrom === 'do_tell_variation') {
      this.removeDraftProduct.emit(request.NotificationNo);
    } else if (editFrom === 'registration') {
      this.removeDraftProduct.emit(Number(request.ID));
    } else if (editFrom === 'legacy') {
      this.removeDraftProduct.emit(Number(request.OLD_PRODUCT_ID));
    }


    this.dataAfterFilters = [];

    this.removeFilterKey = true;
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.contentArray.slice(startItem, endItem);
  }

  addBatch(notificationNumber) {
    this.inputService.publish({type: 'NotificationNumber', payload: notificationNumber});
    this.router.navigateByUrl('/admin/adding-batch');
  }

  seenNotificationFunction(id) {
    this.seenNotification.emit(id);
  }
}
