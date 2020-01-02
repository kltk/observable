import Observable from './observable';
import { useObservable, useActions, useState } from './hooks';
import { Path, Actions, BoundActions } from './hooks';

function create<ObservableState = any>(initial?: ObservableState) {
  const observable = new Observable(initial);

  return {
    useObservable<T extends Actions, ActionState = any>(
      actions: BoundActions<T, ActionState, ObservableState>,
      path?: Path,
      initialState?: any,
    ) {
      return useObservable(observable, actions, path, initialState);
    },

    useActions<T extends Actions, ActionState = any>(
      actions: BoundActions<T, ActionState, ObservableState>,
      path?: Path,
    ) {
      return useActions(observable, actions, path);
    },

    useState: useState.bind(null, observable),
  };
}

export default create;
