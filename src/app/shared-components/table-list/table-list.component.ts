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

    filteredData: Observable<any[]>;

    @Output() removeDetailsRowOutput = new EventEmitter();
    @Output() removeIngrediantDetailsRowOutput = new EventEmitter();
    @Output() removeProductFromKit = new EventEmitter();
    @Output() editDetailedRowOutput = new EventEmitter();
    @Output() seenNotification = new EventEmitter();

    contentArray = [];
    returnedArray: string[];

    constructor(private router: Router, private route: ActivatedRoute, private inputService: InputService) {
    }

    ngOnChanges() {
        if (this.data) {
            if (this.data.tableBody.length > 0) {
                if (this.whichTable !== 'newRequestForDetails' && this.whichTable !== 'newRequestForPackaging' && this.whichTable !== 'productsKitList' && this.whichTable !== 'trackGeneralEnquiries' && this.whichTable !== 'batchTable') {
                    if (this.whichTable !== 'manufacturing') {
                        this.data.tableBody.map(x => {
                            x.ID = x.ID.toString();
                            x.NotificationNo = x.NotificationNo ? x.NotificationNo.toString() : '';
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
        this.sortStatus = !status;
        if (!this.sortStatus) {
            this.dataAfterFilters = this.returnedArray.sort((a, b) => (a[this.staticFilterKey[columnName]].toLowerCase() > b[this.staticFilterKey[columnName]].toLowerCase()) ? 1 : -1);
        } else if (this.sortStatus) {
            this.dataAfterFilters = this.returnedArray.sort((a, b) => (a[this.staticFilterKey[columnName]].toLowerCase() < b[this.staticFilterKey[columnName]].toLowerCase()) ? 1 : -1);
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
        console.log('request', request);
        const editFrom = this.route.snapshot.routeConfig.path;
        if (editFrom === 'tell_do-variation') {
            this.router.navigate([`/new-request/tell_do-variation/${Number(request.NotificationNo)}`]);
        } else if (editFrom === 'tell_do-variation') {
            this.router.navigate([`/new-request/do_tell-variation/${Number(request.NotificationNo)}`]);
        } else if (editFrom === 'registration') {
            this.router.navigate([`/new-request/registration/${Number(request.ID)}`]);
        }
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
