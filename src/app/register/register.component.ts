import { Component, OnInit } from '@angular/core';
import { ActionService } from '../services/action.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  data: any = {};

  constructor(
    public action: ActionService
  ) {
    this.data['user'] = {};
    this.data['first'] = true;
    this.data['second'] = true;
    this.data['index'] = 0;
  }

  ngOnInit(): void {
  }

  checker = () => {
    if (this.data.user.password !== this.data.user.password2 || this.data.user.nin == undefined || this.data.user.bvn == undefined || this.data.user.password === undefined || this.data.user.password2 === undefined) {
      this.action.Toast('error', 'Please fill all field or check that password match', 'Incomplete field');
    }
    else {
      this.data.index = 2;
      this.data.second = false;
    }
  }
  addImage = (ev: any) => {
    this.data['img'] = ev.files;
  }

  //submit here
  submit = () => {
    this.data['loading'] = true
    setTimeout(() => {
      localStorage.setItem('user', JSON.stringify(this.data.user));
      localStorage.setItem('logged', 'true');
      this.data.loading = false;
      this.action.navigate('/home');
    }, 4000)
  }
}
