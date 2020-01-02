import React from 'react';
import Observable from '../observable';
import { concatPath, makeActions, mergeActions } from './utils';
import { Path, Actions, BoundActions } from './utils';

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
  actions: BoundActions<T, ActionState, ObservableState>,
  path?: Path,
) {
  const [ref] = React.useState(() => mergeActions(base, actions));
  Object.assign(ref, { observable, path, actions });

  // todo remove useMemo?
  // todo without persistent function?
  React.useMemo(() => {
    Object.keys(actions).forEach(name => {
      const prop = Object.getOwnPropertyDescriptor(actions, name);
      if (typeof prop.value !== 'function') return;
      if (ref[name].bound) return;

      // make dynamic function with name
      const fn = {
        [name](this: any, ...rest: any[]) {
          this.actions[name].apply(this, rest);
        },
      }[name].bind(ref);
      Object.assign(fn, { bound: true });
      Object.assign(ref, { [name]: fn });
    });
  }, [actions, ref]);

  type OmitStates = Omit<typeof ref, 'observable' | 'state'>;
  type States = {
    observable: Observable<ObservableState>;
    state: typeof actions.state;
  };
  return ref as States & OmitStates;
}

export default useActions;
