import {SelectionModel} from '@angular/cdk/collections';
import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {CarServiceService} from '../car-service.service';
import {RegMsg} from '../Entity/RegMsg';
import {MatPaginator, PageEvent} from '@angular/material';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'tableexample',
  styleUrls: ['mtable.component.css'],
  templateUrl: 'mtable.component.html',
})

export class MtableComponent implements OnInit {
  cookie = 'xx';
  ncar: RegMsg;
  carMsg: RegMsg;
  displayedColumns: string[] = ['select', 'id', 'cph', 'username', 'color', 'fdjID', 'brand',
    'state', 'jjID', 'cxh', 'rtime', 'imgPath', 'ctype', 'firstDate'];
  dataSource;
  selection = new SelectionModel<RegMsg>(true, []);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cs: CarServiceService, private route: Router, private http: HttpClient) {
    this.ncar = new RegMsg();
    this.getCardata();
    this.cs.login(undefined, undefined);
  }
  ngOnInit(): void { }
  authenticated() { return this.cs.authenticated; }
  user() {
    if (sessionStorage.getItem("username")) {
      return sessionStorage.getItem("username");
    }
    return '';
  }
  auth() {
    if (sessionStorage.getItem("auth")) {
      return sessionStorage.getItem("auth");
    }
    return '';
  }
  getCardata(): void {
    this.cs.getCar()
      .subscribe(
      data => {
        this.dataSource = new MatTableDataSource<RegMsg>(data);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
  onselect(form): void {
    if (form.brand === undefined) {
      this.ncar.brand = '';
    } else {
      this.ncar.brand = form.brand;
    }
    if (form.color === undefined) {
      this.ncar.color = '';
    } else {
      this.ncar.color = form.color;
    }
    if (form.ctype === undefined) {
      this.ncar.ctype = '';
    } else {
      this.ncar.ctype = form.ctype;
    }
    this.cs.getCarByBrandColorCtype(this.ncar).subscribe(data => {
      this.dataSource = new MatTableDataSource<RegMsg>(data);
      this.dataSource.paginator = this.paginator;
      // this.dataSource.renderRows();
    });
  }
  edit(): void {
    const obj = this.selection.selected;
    if (obj.length === 1) {
      obj.forEach(({id}) => {
        this.cs.getCarById(id).subscribe((data) => {
          this.carMsg = data;
          this.route.navigate(['./register'], {
            queryParams: {
              id: this.carMsg.id,
              cph: this.carMsg.cph,
              username: this.carMsg.username,
              color: this.carMsg.color,
              fdjID: this.carMsg.fdjID,
              brand: this.carMsg.brand,
              state: this.carMsg.state,
              jjID: this.carMsg.jjID,
              cxh: this.carMsg.cxh,
              rtime: this.carMsg.rtime,
              imgPath: this.carMsg.imgPath,
              ctype: this.carMsg.ctype,
              firstDate: this.carMsg.firstDate
            },
            skipLocationChange: true
          });
        });
      });
    }
  }
  logout() {
    sessionStorage.removeItem("username");
    this.route.navigateByUrl('login');
    this.cs.logout();
  }
  stateStart(): void {
    const str2 = [];
    const obj = this.selection.selected;
    this.selection.clear();
    obj.forEach(({id}) => {
      str2.push({'id': id});
    });
    this.cs.upCarStateStart(str2);
    this.getCardata();
  }
  stateEnd() {
    const str3 = [];
    const obj = this.selection.selected;
    this.selection.clear();
    obj.forEach(({id}) => {
      str3.push({'id': id});
    });
    this.cs.upCarStateEnd(str3);
    this.getCardata();
  }
  delete() {
    const str4 = [];
    const obj = this.selection.selected;
    this.selection.clear();
    obj.forEach(({id}) => {
      str4.push({'id': id});
    });
    this.cs.delete(str4);
    this.getCardata();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: RegMsg): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
