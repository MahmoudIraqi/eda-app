import {Component, OnInit} from '@angular/core';
import {FormService} from '../services/form.service';
import {InputService} from '../services/input.service';

@Component({
  selector: 'app-new-request-container',
  templateUrl: './new-request-container.component.html',
  styleUrls: ['./new-request-container.component.css']
})
export class NewRequestContainerComponent implements OnInit {

  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

  constructor(private getService: FormService, private inputService: InputService) {
  }

  ngOnInit(): void {
    this.getService.getVariablesPricesLookUp().subscribe((res: any) => {
      console.log('res_Variables', res);
      this.inputService.publish({type: 'variablesPrices', payload: res});
    }, error => this.handleError(error));
  }


  handleError(error) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: error.message};
    this.isLoading = false;
  }

}
