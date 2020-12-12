import {Component, OnInit, Input} from '@angular/core';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  @Input() data;
  @Input() notificationStatus;
  @Input() editActionsStatus;
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

  constructor() {
  }

  ngOnInit(): void {
  }

  setStep(index: number) {
    this.step = index;
  }

  sortBy(status, columnName) {
    this.sortStatus = !status;
    if (!this.sortStatus) {
      this.dataAfterFilters = this.data.sort((a, b) => (a[columnName] > b[columnName]) ? 1 : -1);
    } else if (this.sortStatus) {
      this.dataAfterFilters = this.data.sort((a, b) => (a[columnName] < b[columnName]) ? 1 : -1);
    }
  }

  filterForStatus(event) {
    const typeOfStatus = event.value;
    if (typeOfStatus !== 'all') {
      this.dataAfterFilters = this.data.filter(x => x.status === typeOfStatus);
    } else {
      this.dataAfterFilters = this.data;
    }
  }
}
