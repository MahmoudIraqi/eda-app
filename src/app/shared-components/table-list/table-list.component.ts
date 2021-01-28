import {Component, OnInit, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {MatInputModule} from '@angular/material/input';

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
  filterByStatus = ['all', 'In Progress', 'starting'];
  dataAfterFilters = [];
  filterData = {
    filterKey: []
  };
  filterRow = [];
  sortStatus = false;
  keyForFilter;
  keyWordsForFilter;
  alertNotificationStatus: boolean = false;

  @Output() removeDetailsRowOutput = new EventEmitter();
  @Output() removeIngrediantDetailsRowOutput = new EventEmitter();
  @Output() editDetailedRowOutput = new EventEmitter();

  constructor() {
  }

  ngOnChanges() {
    if (this.data !== undefined) {
      this.data.tableBody.map(x => x.ID = x.ID.toString());
      const tableColumnID = Object.keys(this.data.tableBody[0]).map((x, i) => x);
      this.data.tableHeader.map((x, i) => {
        this.filterData.filterKey.push({name: this.data.tableHeader[i], id: tableColumnID[i]});
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

  editDetailedRowFunction(i) {
    this.editDetailedRowOutput.emit(i);
  }

  setTheFilteredData(event) {
    if (event.keyForFilter.id) {
      if (event.filterRow.length > 0) {
        if (event.keyWordsForFilter) {
          this.dataAfterFilters = this.dataAfterFilters.filter(x => x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter));
          this.dataAfterFilters.length === 0 ? this.showAlertForFailedAlert() : this.alertNotificationStatus = false;
        }
      } else {
        if (event.keyWordsForFilter) {
          this.dataAfterFilters = this.data.tableBody.filter(x => x[event.keyForFilter.id].toLowerCase().includes(event.keyWordsForFilter));
          this.dataAfterFilters.length === 0 ? this.showAlertForFailedAlert() : this.alertNotificationStatus = false;
        }
      }
    }
  }

  showAlertForFailedAlert() {
    this.dataAfterFilters = [];
    this.alertNotificationStatus = true;

    setTimeout(() => {
      this.alertNotificationStatus = false;
    }, 3000);
  }
}
