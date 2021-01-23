import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;

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
              private router: Router) {
    this.form = this.fb.group({
      username: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    });
  }

  submit() {
    if (this.form.valid) {
      this.formLoginData.filter(x => x.username === this.form.get('username').value).map(y => {
        if (y.password === this.form.get('password').value) {
          this.router.navigateByUrl('/home');
        }
      });
    }
  }
}
