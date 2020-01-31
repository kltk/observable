import Observable from './observable';
import { useObservable, useActions, useState } from './hooks';
import { Path, Actions, ActionsArg } from './hooks';

function create<ObservableState = any>(initial?: ObservableState) {
  const observable = new Observable(initial);

  return {
    observable,

    useObservable<T extends Actions, ActionState = any>(
      actions: ActionsArg<T, ActionState, ObservableState>,
      path?: Path,
      initialState?: any,
    ) {
      return useObservable(observable, actions, path, initialState);
    },

    useActions<T extends Actions, ActionState = any>(
      actions: ActionsArg<T, ActionState, ObservableState>,
      path?: Path,
    ) {
      return useActions(observable, actions, path);
    },

    useState: useState.bind(null, observable),
  };
}

export default create;
