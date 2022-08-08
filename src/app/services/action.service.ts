import { Injectable, NgZone } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import Axios from 'axios-observable';
import axios from 'axios';
import { format, parseISO, getDate, getMonth, getYear } from 'date-fns';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  data: any = {};

  constructor(
    public _location: Location,
    public modal: DialogService,
    public confirm: ConfirmationService,
    public route: Router,
    public zone: NgZone,
    public device: DeviceDetectorService,
    public toast: MessageService
  ) { }

  //configure url parameter here
  checkFullURL = (action: string) => {
    return new Promise((resolve, reject) => {
      // if (action.indexOf('http://') > -1 || action.indexOf('https://') > -1) {
      //   resolve(action);
      // }
      // //set headers here
      // //first fetch the assigned route in firebase endpoints
      // this.data['sub'] = this.fire.getSingle('endpoints', action).subscribe((res: any) => {
      //   if (res == undefined) {
      //     this.data.sub.unsubscribe();
      //     reject('error');
      //   }
      //   else {
      //     this.data.sub.unsubscribe();
      //     resolve(this.data.url1 + res.route);
      //   }
      // }, (err: any) => {
      //   this.data.sub.unsubscribe();
      //   reject('error');
      // })
    })
  }

  //get request
  async get(action: string, data = {}) {
    return new Promise((resolve, reject) => {
      this.checkFullURL(action).then(res => {
        this.data['url'] = res;
        Axios.request({
          method: 'GET',
          timeout: 6000,
          url: this.data['url'],
          //  headers: this.config.headers,
          params: data,
        }).subscribe((res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  //make post request here
  async post(action: string, data = {}) {
    return new Promise((resolve, reject) => {
      this.checkFullURL(action).then(res => {
        this.data['url'] = res;
        Axios.request({
          method: 'POST',
          timeout: 15000,
          url: this.data.url,
          headers: this.data.config.header,
          data: data
        }).subscribe((res: any) => {
          resolve(res);
        }, (err: any) => {
          reject(err)
        })
      }).catch(err => {
        reject(err);
      })
    })
  }

  //control application events here, this is for publishing
  publishData(data: any) {
    this.data.subject.next(data);
  }

  //retriev
  getPublished(): Subject<any> {
    return this.data.subject;
  }

  //save files here
  saveItem(item: any) {
    this.data['item'] = item;
    return "succces";
  }

  getItem() {
    return this.data.item;
  }

  //use this to process single image pick here (non native)
  processSingleImage = async ($event: any, type: any = '') => {
    return new Promise((resolve, reject) => {
      let file = (type == '') ? $event.target.files[0] : $event;
      const data = new FileReader();
      data.readAsDataURL(file);
      data.onload = (dataReader) => {
        this.data['formData'] = dataReader;
        let image_data = (this.data.formData.target.result.substr(0, 22) === "data:image/png;base64,") ? this.data.formData.target.result.replace("data:image/png;base64,", "") : this.data.formData.target.result.replace("data:image/jpeg;base64,", "");
        resolve(image_data);
      }
    })
  }

  //process single video here
  processSingleVideo = async ($event: any) => {
    return new Promise((resolve, reject) => {
      let file = $event[0];
      const data = new FileReader();
      data.readAsDataURL(file);
      data.onload = (dataReader) => {
        this.data['formData'] = dataReader;
        let video_data = (this.data.formData.target.result.substr(0, 22) === "data:video/mp4;base64,") ? this.data.formData.target.result.replace("data:video/mp4;base64,", "") : this.data.formData.target.result.replace("data:video/3gp;base64,", "");
        resolve(video_data);
      }
    })
  }

  //for processing multiple video selection
  processMultipleImage = async ($event: any) => {
    this.data['res'] = [];
    return new Promise(async (resolve, reject) => {
      //loop through the files
      let res = await this.process($event);
      resolve(this.data.res);
    })
  }

  process = async (file: any) => {
    let length = file.length;
    //loop through and do whatever
    for (let i = 0; i < length; i++) {
      const run = await this.loop(length, file, i);
      this.data.res.push(run);
    }
    return true;

  }

  loop(length: any, file: any, i: any) {
    return new Promise(resolve => {
      setTimeout(() => {
        let file_n = file[i];
        const data = new FileReader();
        data.readAsDataURL(file_n);
        data.onload = (dataReader) => {
          this.data['formData'] = dataReader;
          let video_data = (this.data.formData.target.result.substr(0, 22) === "data:video/mp4;base64,") ? this.data.formData.target.result.replace("data:image/png;base64,", "") : this.data.formData.target.result.replace("data:image/jpeg;base64,", "");
          resolve(video_data);
        }
      }, 1000);
    })
  }

  //function to calculate distance between two coordinates
  calcCrow = (lat1: any, lon1: any, lat2: any, lon2: any) => {
    return new Promise((resolve, reject) => {
      var radlat1 = Math.PI * lat1 / 180;
      var radlat2 = Math.PI * lat2 / 180;
      var theta = lon1 - lon2;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515; //meters
      dist = dist * 1.609344
      // if (unit=="N") { dist = dist * 0.8684 }
      resolve(Math.round(dist));
    })
  }

  formatDate(value: any) {
    return format(parseISO(value), 'MMM dd yyyy')
  }

  formatTime(value: any) {
    return format(parseISO(value), 'HH:mm');
  }

  generateId() {
    //  return uuidv4();
    return Math.random().toString(36).substr(2, 9);
  }

  calcTotal = (res: any) => {
    return new Promise((resolve, reject) => {
      resolve(res.reduce((accumulator: any, item: any) => accumulator + parseInt(item.amount), 0))
    })
  }

  getDate = () => {
    const d = new Date();
    return d.toDateString();
  }
  getTime = () => {
    const d = new Date();
    return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
  }
  getDateDiff = (dt1: any, dt2: any) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return (Math.round(diff));
  }
  modalCreate = (component: any, config: any = {}) => {
    return new Promise((resolve, reject) => {
      this.data['modal'] = this.modal.open(component, config);
      this.data['modal'].onClose.subscribe((res: any) => {
        resolve(res)
      })
    })
  }

  navigate = (path: any) => {
    this.route.navigateByUrl(path);
  }

  history = () => {
    this._location.back();
  }

  Toast = (sev: any, mes: any, sum: any = '') => {
    this.toast.add({ severity: sev, summary: sum, detail: mes });
  }
  alertConfirm = (ev: any = '', message: any) => {
    return new Promise((resolve, reject) => {
      this.confirm.confirm({
        target: ev.target,
        message: message,
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-warning',
        rejectButtonStyleClass: 'p-button-white',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        }
      });
    });
  }

}
