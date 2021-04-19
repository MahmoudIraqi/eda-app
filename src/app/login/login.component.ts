import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormService} from '../services/form.service';
import {InputService} from '../services/input.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;
  returnUrl: string;

  formLoginData = [
    {
      username: 'AhmedYousry',
      password: '123456'
    },
    {
      username: 'AbdelRahman',
      password: '123456'
    },
    {
      username: 'admin',
      password: 'admin'
    }
  ];

  constructor(private fb: FormBuilder,
              private getService: FormService,
              private inputService: InputService,
              private router: Router,
              private route: ActivatedRoute) {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit() {
    if (this.form.valid) {
      this.isLoading = true;
      this.getService.loginAPIToken(this.form.value).subscribe((res: any) => {
        if (res) {
          if (res.Status === '1') {
            this.isLoading = false;
            this.alertNotificationStatus = true;
            this.inputService.publish({type: 'Token', payload: res.Token});
            localStorage.setItem('privateData', res.Token);
            this.router.navigateByUrl('/home');
          } else {
            this.isLoading = false;
            this.alertErrorNotificationStatus = true;
          }
        }
      }, error => this.handleError(error));
    }
  }

  handleError(message) {
    this.isLoading = false;
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
  }
}
