import { Observable } from 'rxjs';
import { LoaderState } from './../state/loader.state';
import { Store, Select } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public loading: boolean;
  @Select(LoaderState.status) public loading$: Observable<any>;

  constructor(
    private http: HttpClient,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.loading = true;

    this.http.get('http://jsonplaceholder.typicode.com/users').subscribe(users => {
      console.log(users);
    });

    this.loading$.subscribe(loading => {
      console.log(loading);
      this.loading = false;
    });
  }

}
