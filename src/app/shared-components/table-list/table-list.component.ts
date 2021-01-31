import {Component, OnInit, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {FormService} from '../../services/form.service';
import {Router} from '@angular/router';

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
    'Request id': 'ID',
    'Submission date': 'SubmmittionDate',
    'Product English name': 'NameEN',
    'Product Arabic name': 'NameAR',
    'Status': 'Status',
    'Track Type': 'Track_type',
    'Notification': 'NotificationNo'
  };
  sortStatus = false;
  alertNotificationStatus: boolean = false;

  @Output() removeDetailsRowOutput = new EventEmitter();
  @Output() removeIngrediantDetailsRowOutput = new EventEmitter();
  @Output() removeProductFromKit = new EventEmitter();
  @Output() editDetailedRowOutput = new EventEmitter();

  constructor(private getServices: FormService, private router: Router) {
  }

  ngOnChanges() {

    if (this.data !== undefined && (this.whichTable !== 'newRequestForDetails' && this.whichTable !== 'newRequestForPackaging' && this.whichTable !== 'productsKitList')) {
      this.data.tableBody.map(x => x.ID = x.ID.toString());
      const tableColumnID = Object.keys(this.data.tableBody[0]).map((x, i) => x);
      this.data.tableHeader.map((x, i) => {
        if (this.staticFilterKey[this.data.tableHeader[i]]) {
          this.filterData.filterKey.push({name: this.data.tableHeader[i], id: this.staticFilterKey[this.data.tableHeader[i]]});
        }
      });
    }
  }

  ngOnInit(): void {

  }

  setStep(index: number) {
    this.step = index;
  }

  sortBy(status, columnName) {
    this.sortStatus = !status;

    if (!this.sortStatus) {
      this.dataAfterFilters = this.data.tableBody.sort((a, b) => (a[columnName.toLowerCase()] > b[columnName.toLowerCase()]) ? 1 : -1);
    } else if (this.sortStatus) {
      this.dataAfterFilters = this.data.tableBody.sort((a, b) => (a[columnName.toLowerCase()] < b[columnName.toLowerCase()]) ? 1 : -1);
    }
  }

  removeDetailsRowFunction(i, rowIndex) {
    this.removeDetailsRowOutput.emit({rowIndex, i});
  }

  removeIngrediantDetailsRowFunction(childIndex, i, indexRow) {
    this.removeIngrediantDetailsRowOutput.emit({childIndex, indexRow, i});
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
          if (event.keyForFilter.id === 'SubmmittionDate') {
            this.dataAfterFilters.map(x => x[event.keyForFilter.id] = new Date(x[event.keyForFilter.id]).toDateString());
            if (this.dataAfterFilters.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString()).length > 0) {
              this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString());
            } else {
              this.showAlertForFailedAlert();
            }
          } else {
            if (this.dataAfterFilters.filter(x => x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase())).length > 0) {
              this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase()));
            } else {
              this.showAlertForFailedAlert();
            }
          }
        } else {
          event.filterRow.map((x, i) => {
            if (i === 0) {
              if (this.staticFilterKey[x.columnName] === 'SubmmittionDate') {
                this.data.tableBody.map(y => y[this.staticFilterKey[x.columnName]] = new Date(y[this.staticFilterKey[x.columnName]]).toDateString());
                if (this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString()).length > 0) {
                  this.dataAfterFilters = this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString());
                } else {
                  this.showAlertForFailedAlert();
                }
              } else {
                if (this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase())).length > 0) {
                  this.dataAfterFilters = this.data.tableBody.filter(y => y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase()));
                } else {
                  this.showAlertForFailedAlert();
                }
              }
            } else {
              if (this.staticFilterKey[x.columnName] === 'SubmmittionDate') {
                this.dataAfterFilters.map(y => y[this.staticFilterKey[x.columnName]] = new Date(y[this.staticFilterKey[x.columnName]]).toDateString());
                if (this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString()).length > 0) {
                  this.dataAfterFilters = this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]] === x.keyword.toDateString());
                } else {
                  this.showAlertForFailedAlert();
                }
              } else {
                if (this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase())).length > 0) {
                  this.dataAfterFilters = this.dataAfterFilters.filter(y => y[this.staticFilterKey[x.columnName]].toLowerCase().includes(x.keyword.toLowerCase()));
                } else {
                  this.showAlertForFailedAlert();
                }
              }
            }
          });
        }
      } else {
        if (event.keyWordsForFilter) {
          if (event.keyForFilter.id === 'SubmmittionDate') {
            this.data.tableBody.map(x => x[event.keyForFilter.id] = new Date(x[event.keyForFilter.id]).toDateString());
            if (this.data.tableBody.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString()).length > 0) {
              this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id] === event.keyWordsForFilter.toDateString());
            } else {
              this.showAlertForFailedAlert();
            }
          } else {
            if (this.data.tableBody.filter(x => x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase())).length > 0) {
              this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter.toLowerCase()));
            } else {
              this.showAlertForFailedAlert();
            }
          }
        } else {
          this.dataAfterFilters = [];
        }
      }
    }
  }

  showAlertForFailedAlert() {
    this.alertNotificationStatus = true;

    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 3000);
  }

  editProduct(id) {
    this.router.navigate([`/new-request/registration/${Number(id)}`]);
  }
}
