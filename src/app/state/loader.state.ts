import { HideLoaderAction, ShowLoaderAction } from './../actions/loader.actions';
import { Injectable } from '@angular/core';
import { Action, State, StateContext, Selector } from '@ngxs/store';

export class LoaderStateModel {
  public status: boolean;
}

@State<LoaderStateModel>({
  name: 'loader',
  defaults: {
    status: false
  }
})

@Injectable()
export class LoaderState {
  @Selector()
  public static status(state: LoaderStateModel) {
    return state.status;
  }

  @Action(ShowLoaderAction)
  public showLoaderAction(ctx: StateContext<LoaderStateModel>) {
    return ctx.setState({ status: true });
  }

  @Action(HideLoaderAction)
  public hideLoaderAction(ctx: StateContext<LoaderStateModel>) {
    return ctx.setState({ status: false });
  }
}
