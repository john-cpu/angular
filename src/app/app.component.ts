import {Component, Inject} from '@angular/core';
@Component({
  selector: 'app-root',
 //  template: '<carForm [person]="person" (onYell) = "yell()"></carForm>'
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.sass']
})
export class AppComponent {
  people = [
    {name: 'herry', age: 18}, {name: 'JOK', age: 20}, {name: 'MARK', age: 21},
  ]
  yell() {
    alert('yelling');
  }
}
