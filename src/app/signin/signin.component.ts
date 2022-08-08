import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActionService } from '../services/action.service';
import { LoginComponent } from '../modals/login/login.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  data: any = {}
  constructor(
    public action: ActionService
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.action.modalCreate(LoginComponent, {
      header: 'Sign in',
      width: '80%',
      height: '80%'
    }).then((res: any) => {
      if (res != undefined) {
        switch (res.message) {
          case '200':
            localStorage.setItem('logged', 'true');
            this.action.navigate('/home');
            break;
          case '404':
            this.action.navigate('/register');
            break;
          case '505':
            this.action.navigate('/register');
        }
      }
    })
  }

}
