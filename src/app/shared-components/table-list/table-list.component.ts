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
  sortStatus = false;

  @Output() removeDetailsRowOutput = new EventEmitter();
  @Output() removeIngrediantDetailsRowOutput = new EventEmitter();
  @Output() editDetailedRowOutput = new EventEmitter();

  constructor() {
  }

  ngOnChanges() {
    console.log('data', this.data);
    console.log('whichTable', this.whichTable);
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

  filterForStatus(event) {
    const typeOfStatus = event.value;
    if (typeOfStatus !== 'all') {
      this.dataAfterFilters = this.data.tableBody.filter(x => x.status === typeOfStatus);
    } else {
      this.dataAfterFilters = this.data.tableBody;
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
}
