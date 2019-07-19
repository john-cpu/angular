import {Component, OnInit} from '@angular/core';
import {CarServiceService} from '../car-service.service';
import {RegMsg} from '../Entity/RegMsg';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'carForm',
  templateUrl: './carForm.component.html',
  styleUrls: ['./carForm.component.css'],
})
export class CarFormComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:8080/uploadCarFile',
    method: 'POST',
    itemAlias: 'uploadedfile'
  });
  public file: File;
  public car: RegMsg;
  id: string;
  constructor(private cs: CarServiceService,  private picd: DomSanitizer, private http: HttpClient, private router: Router, private route: ActivatedRoute
  ) {
    this.car = new RegMsg();
    this.id = route.snapshot.params['id'];
  }
  uploadFile() {this.uploader.queue[0].onSuccess = (response, status, headers) => {
    if (status === 200) {
      alert('上传成功');
    } else {
      alert('上传失败');
    }};
    this.uploader.queue[0].upload();
  }
  onsubmit(form): void {
    if (form.state === undefined) {
      this.car.state = '启用';
    } else {
      this.car.state = form.state;
    }
    if (form.id === undefined) {
      this.car.imgPath = 'D:\\ImageFile\\car\\' + this.file.name;
      this.cs.addCar(this.car);
      this.uploadFile();
    } else {
      this.car.imgPath = 'D:\\ImageFile\\car\\' + this.file.name;
      this.cs.updateCar(this.car);
      this.uploadFile();
    }
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        this.car.id = params['id'];
        this.car.cph = params['cph'];
        this.car.username = params['username'];
        this.car.color = params['color'];
        this.car.ctype = params['ctype'];
        this.car.imgPath = params['imgPath'];
        this.car.rtime = params['rtime'];
        this.car.firstDate = params['firstDate'];
        this.car.brand = params['brand'];
        this.car.jjID = params['jjID'];
        this.car.fdjID = params['fdjID'];
        this.car.state = params['state'];
        this.car.cxh = params['cxh'];
      }
    );
  }
  goBack() {
    window.history.back();
  }
  fileChange(e) {
    this.file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
  }
}
