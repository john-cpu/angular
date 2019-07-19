import {Component} from '@angular/core';
import {CarServiceService} from '../car-service.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {username: '', password: ''};
  constructor(private cs: CarServiceService, private http: HttpClient, private router: Router) { }
  login() {
    this.cs.login(this.credentials, () => {
    this.router.navigateByUrl('');
    });
    return false;
  }

}
