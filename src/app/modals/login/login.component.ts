import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActionService } from '../../services/action.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  data: any = {}
  constructor(
    public action: ActionService
  ) {
    this.data['details'] = {}
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
  }

  login = () => {
    this.data['loading'] = true;
    setTimeout(() => {
      const user: any = localStorage.getItem('user') || undefined;
      if (this.data.details.mail == undefined || this.data.details.pass == undefined) {
        this.action.Toast('error', 'Please fill all fields');
        this.data.loading = false;
      }
      else if (user == undefined) {
        //send back to register page
        this.action.Toast('error', 'No user record found, kindly sign up to proceed');
        setTimeout(() => {
          this.action.data.modal.close({ message: '404' });
        }, 2000);
      }
      else {
        const users = JSON.parse(user);
        if (this.data.details['mail'] != users.email || this.data.details['pass'] != users.password2) {
          this.action.Toast('error', 'Invalid login details', 'error');
          this.data['loading'] = false;
        }
        else {
          this.action.Toast('success', 'login successful');
          setTimeout(() => {
            this.data['loading'] = false;
            this.action.data.modal.close({ message: '200' });
          }, 2000);
        }
      }
    }, 3000)
  }

}
