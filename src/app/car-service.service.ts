import { Injectable } from '@angular/core';
import {RegMsg} from './Entity/RegMsg';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {FileUploader} from 'ng2-file-upload';



@Injectable({
  providedIn: 'root'
})
export class CarServiceService {

  auth = '';
  authenticated = false;
  private serviceUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) {
  }
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json', // x-www-form-urlencoded
      'Access-Control-Allow-Origin': '*',
      withCredentials: 'true'
    })
  };
  private httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'multipart/form-data',
    })
  };
  public login(credentials, callback) {
    const headers = new HttpHeaders(credentials ? {
      authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
    } : {});
    // 新建Headers，并添加认证信息
    /*let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));*/
    // 发起get请求并返回
    this.httpClient.get(this.serviceUrl + '/admin', { headers: headers }).subscribe(response => {
        if (response['name'] && response['authorities']) {// ROLE_USER
          if (response['authorities'].length === 2) {
            this.auth = response['authorities'][0].authority + ':' + response['authorities'][1].authority;
          } else {
            this.auth = response['authorities'][0].authority;
          }
          sessionStorage.setItem("auth",this.auth);
          sessionStorage.setItem("username", response['name']);
          this.authenticated = true;
        } else {
          this.authenticated = false;
        }
        return callback && callback();
      });
  }

  /**
   * 注销
   */
  public logout() {
    this.httpClient.post(this.serviceUrl + '/logout', this.httpOptions).toPromise().then(() => {alert('logout success'); } );
  }
  addCar(car: RegMsg): any {
    return this.httpClient.post(this.serviceUrl + '/saveCar', car, this.httpOptions).toPromise().then(() => alert('sucsess')); /*toPromise().then(res => console.log(res))*/
  }
  getCar(): Observable<RegMsg[]> {
    return this.httpClient.get<RegMsg[]>(this.serviceUrl +  '/getCar', this.httpOptions);
  }
  getCarByBrandColorCtype(car: RegMsg): Observable<RegMsg[]> {
    return this.httpClient.post<RegMsg[]>(this.serviceUrl + '/getCarByBrandColorCtype', car, this.httpOptions);
  }
  getCarById(id: number): Observable<RegMsg> {
    return this.httpClient.get<RegMsg>(this.serviceUrl + '/getCarById?id=' + id);
  }
  updateCar(car: RegMsg): void {
    this.httpClient.post('http://localhost:8080/updateCar', car, this.httpOptions).subscribe(() => console.log('success'));
  }
  upCarStateStart(str: any[]): void {
    this.httpClient.post(this.serviceUrl + '/upCarStateStart', JSON.stringify(str)).toPromise().then(() => console.log('success')); // new Array;
  }
  upCarStateEnd(str: any[]): void {
    this.httpClient.post(this.serviceUrl + '/upCarStateEnd', JSON.stringify(str)).toPromise().then(data => console.log(data));
  }
  delete(str: any[]): void {
    this.httpClient.post(this.serviceUrl + '/delete', str).toPromise().then(() => console.log('success'));
  }
  uploadFile(file): any {
    this.httpClient.post(this.serviceUrl + '/uploadFile', file, this.httpOptions2).toPromise().then(() => alert('upload success'));
  }
}
