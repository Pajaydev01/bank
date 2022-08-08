import { Component, OnInit } from '@angular/core';
import { ActionService } from '../../services/action.service';


@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  data: any = {}
  constructor(
    public action: ActionService
  ) {
    this.data['user'] = {};
    this.data['loading'] = false;
    this.data['banks'] = [
      {
        name: 'Access Bank',
        code: '1'
      },
      {
        name: 'Global bank',
        code: '2'
      },
      {
        name: 'Unique bank',
        code: '3'
      },
      {
        name: 'Henrious bank',
        code: '4'
      }
    ]
    const user: any = localStorage.getItem('user');
    this.data['userData'] = JSON.parse(user);
  }

  ngOnInit(): void {
  }
  checker = (item: any) => {
    return item == undefined || this.data['loading'];
  }

  checkerPin = (item: any) => {
    //  console.log(item)
    return item.length !== 4 || this.data['loading'];
  }

  check = (ev: any) => {
    if (ev.value.toString().length == 10) {
      this.data['nameLoad'] = true;
      setTimeout(() => {
        this.data['receiver'] = "Johnson Aniyi Oalere";
        this.data.user['reciever'] = this.data['receiver'];
        this.data.nameLoad = false;
      }, 3000);
    }
  }

  pay = () => {
    this.data.loading = true;
    setTimeout(() => {
      this.data.loading = false;
      this.data.user['ref'] = this.action.generateId();
      this.data.user['date'] = this.action.getDate();
      this.data.user['time'] = this.action.getTime();
      this.buildReciept(this.data.user);
    }, 5000);
  }

  buildReciept = (data: any) => {
    const transactions: any = localStorage.getItem('transactions') || [];
    transactions.push(data);
    this.action.data.modal.close({ success: true, data: data });
  }

}
