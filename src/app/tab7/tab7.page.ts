import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable'
import { SharedToastService } from '../tabs/shared-toast/shared-toast.service';

export interface Data {
  movies: string;
}

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class Tab7Page implements OnInit {

  public data: Data;
  public columns: any;
  public rows: any;

  selected = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;


  constructor(
    private http: HttpClient,
    public toast: SharedToastService,
  ) {
    this.columns = [
      { name: 'Name' },
      { name: 'Company' },
      { name: 'Genre' },
      { name: 'Group' }
    ];

    this.http.get<Data>('../../assets/movies.json')
      .subscribe((res) => {
        console.log(res)
        this.rows = res.movies;
      });
  }

  ngOnInit() {
  }

  onSelect({ selected }) {
    // console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  // onActivate(event) {
  //   console.log('Activate Event', event);
  // }

  submitArray() {
    console.log(this.selected);
    this.toast.ToastInfo = {
      header: 'NGX Table',
      message: 'Đã lưu ' + this.selected.length + ' dữ liệu vào console!',
      color: 'success',
    }
    this.toast.presentToast();

    this.clearArray();
  }

  clearArray() {
    this.selected = [];
  }

}
