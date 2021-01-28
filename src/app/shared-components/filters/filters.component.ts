import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit, OnChanges {

  @Input() filterData;
  filterRow = [];
  keyForFilter;
  keyWordsForFilter;
  @Output() selectedFilteredData = new EventEmitter();

  constructor() {
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

  setTheFilteredData() {
    this.selectedFilteredData.emit({
      keyForFilter: this.keyForFilter,
      keyWordsForFilter: this.keyWordsForFilter,
      filterRow: this.filterRow
    });
  }

  addFilteredRow() {
    this.filterRow.push({columnName: this.keyForFilter.name, keyword: this.keyWordsForFilter});
    this.keyForFilter = '';
    this.keyWordsForFilter = '';

    this.setTheFilteredData();
  }

  removeKeywordFromFilter(i) {
    this.filterRow.splice(i);

    this.setTheFilteredData();
  }

}
