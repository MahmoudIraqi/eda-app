import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FormService} from '../services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  alertNotificationStatus: boolean = false;
  alertNotification: any;
  alertErrorNotificationStatus: boolean = false;
  alertErrorNotification: any;
  isLoading: boolean = false;

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
              private router: Router) {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  submit() {
    if (this.form.valid) {
      // this.formLoginData.filter(x => x.username === this.form.get('username').value).map(y => {
      //   if (y.password === this.form.get('password').value) {
      //     this.router.navigateByUrl('/home');
      //   }
      // });
      this.getService.loginAPIToken(this.form.value).subscribe((res: any) => {
        if(res.Status){
          this.isLoading = false;
          this.alertNotificationStatus = true;
          this.router.navigateByUrl('/home');
        }
      }, error => this.handleError(error));
    }
  }

  handleError(message) {
    this.alertErrorNotificationStatus = true;
    this.alertErrorNotification = {msg: message};
    this.isLoading = false;
  }
}
