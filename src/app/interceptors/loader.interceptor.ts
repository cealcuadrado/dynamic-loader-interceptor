import { LoaderDialogComponent } from './../loader-dialog/loader-dialog.component';
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
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private store: Store,
    private dialog: MatDialog
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const dialogRef = this.dialog.open(LoaderDialogComponent)
    this.store.dispatch(new ShowLoaderAction());

    return next.handle(request).pipe(
      map(res => {
        console.log('Response');
        return res;
      }),
      finalize(() => {
        this.store.dispatch(new HideLoaderAction());
        dialogRef.close();
      })
    );
  }
}
