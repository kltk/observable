import toPath = require('lodash.topath');
import Observable from '../observable';

type Path<T = string | number> = T | T[];

// todo
// type Action = Function & { bound?: boolean };
// type Actions = { [name in string | number | symbol]: Action };
type Actions = { [name in string | number | symbol]: any };

type BoundType<T> = T & ThisType<T>;

type BoundActions<T, ActionState = any, ObservableState = any> = BoundType<
  T & {
    observable?: Observable<ObservableState>;
    path?: Path;
    state?: ActionState;
    get?: (path: Path) => any;
    set?: (data: any, path?: Path) => any;
  }
>;

function concatPath(a: Path, b: Path) {
  return [...toPath(a), ...toPath(b)];
}

function makeActions<T, ActionState = any, ObservableState = any>(
  actions: BoundActions<T, ActionState, ObservableState>,
) {
  return actions;
}

function mergeActions<A, B>(a: A, b: B): A & B {
  const oa = Object.getOwnPropertyDescriptors(a);
  const ob = Object.getOwnPropertyDescriptors(b);
  return Object.create({}, { ...oa, ...ob });
}

export { Path, Actions, BoundActions };
export { concatPath, makeActions, mergeActions };
