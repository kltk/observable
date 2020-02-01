import React from 'react';
import Observable from '../observable';
import { concatPath, makeActions, mergeActions } from './utils';
import { Path, Actions, BoundActions, ActionsArg } from './utils';

const base = makeActions({
  get state() {
    return this.get();
  },
  get(subPath) {
    return this.observable.get(concatPath(this.path, subPath));
  },
  set(data, subPath) {
    return this.observable.set(data, concatPath(this.path, subPath));
  },
});

function useActions<
  T extends Actions,
  ActionState = any,
  ObservableState = any
>(
  observable: Observable<ObservableState>,
  actions: ActionsArg<T, ActionState, ObservableState>,
  path?: Path,
) {
  const [ref] = React.useState(() => mergeActions(base, actions));
  Object.assign(ref, { observable, path });

  // todo remove useMemo?
  // todo without persistent function?
  React.useMemo(() => {
    const mergedActions = mergeActions(base, actions);
    Object.keys(mergedActions).forEach(name => {
      const value = Object.getOwnPropertyDescriptor(mergedActions, name)?.value;
      if (typeof value !== 'function') return;
      if (ref[name]?.bound === value) return;

      const fn = value.bind(ref);
      Object.assign(fn, { bound: value });
      Object.assign(ref, { [name]: fn });
    });
  }, [actions, ref]);

  return ref as BoundActions<T, ActionState, ObservableState>;
}

export default useActions;
