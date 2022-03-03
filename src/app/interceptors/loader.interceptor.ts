import { HideLoaderAction, ShowLoaderAction } from './../actions/loader.actions';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, map } from 'rxjs';
import { Store } from '@ngxs/store';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private store: Store
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('Request');
    this.store.dispatch(new ShowLoaderAction());

    return next.handle(request).pipe(
      map(res => {
        console.log('Response');
        return res;
      }),
      finalize(() => this.store.dispatch(new HideLoaderAction()))
    );
  }
}
