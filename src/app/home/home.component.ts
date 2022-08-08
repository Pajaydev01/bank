import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActionService } from '../services/action.service'
import { MenuItem } from 'primeng/api';
import { TransferComponent } from '../modals/transfer/transfer.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  data: any = {};

  constructor(
    public action: ActionService
  ) {
    const user: any = localStorage.getItem('user');
    this.data['userData'] = JSON.parse(user);

    this.data['search'] = '';
    const item: MenuItem[] = [
      {
        label: 'Dashboard',
        icon: 'pi pi-align-justify'
      },
      {
        label: 'Wallet',
        icon: 'pi pi-wallet'
      },
      {
        label: 'Transactions',
        icon: 'pi pi-sort-alt'
      },
      {
        label: 'Actions',
        icon: 'pi pi-ellipsis-h',
        items: [
          {
            label: 'Send money',
            icon: 'pi pi-send',
            command: () => {
              this.action.modalCreate(TransferComponent, {
                header: 'Send money',
                width: '80%',
                height: '80%'
              }).then((res: any) => {
                if (res !== undefined) {
                  this.action.Toast('success', 'Transfer succesful!, generating receipt');
                  const data = {
                    ...this.data.user,
                    ...res.data
                  }
                  this.data.user = data;
                  this.data['receipt'] = true;
                }
              })
            }
          }
        ]
      }
    ];
    this.data['menuItems'] = item;
    this.data['transaction'] = [
      {
        name: "Pajay",
        type: 'Sent',
        action: 'dr',
        amount: '25000',
        currency: 'NGN'
      },
      {
        name: "Johnson",
        type: 'Recieved',
        action: 'cr',
        amount: '15000',
        currency: 'NGN'
      },
      {
        name: "Sapphire",
        type: 'Airtime',
        action: 'dr',
        amount: '2000',
        currency: 'USD'
      },
      {
        name: "Pajay",
        type: 'Sent',
        action: 'dr',
        amount: '25000',
        currency: 'NGN'
      },
      {
        name: "Sapphire",
        type: 'Airtime',
        action: 'cr',
        amount: '2000',
        currency: 'USD'
      }
    ]

    this.data['mapItems'] =
    {
      datas: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novermber', 'December'],
        datasets: [
          {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40, 10, 45, 50, 16, 60]
          },
          {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 55, 80, 80, 25, 45, 70]
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: 'My Title',
          fontSize: 16
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  };

  signout = (ev: any) => {
    this.action.alertConfirm(ev, 'Are you sure you want to logout').then((res: any) => {
      if (res) {
        //logout
        localStorage.removeItem('logged');
        this.action.navigate('/signin')
      }
      else {
        this.action.Toast('error', 'Cancelled', '');
      }
    })
  }
  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    localStorage.getItem('logged') ? '' : this.action.navigate('/signin');
    const user: any = localStorage.getItem('user');
    this.data['user'] = user ? JSON.parse(user) : {};
    this.data['user']['balance'] = 25000;
  }

  sign = (action: any) => {
    if (action !== 'dr') {
      return '+';
    }
    else {
      return '-'
    }
  }
}
