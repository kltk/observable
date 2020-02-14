import toPath from 'lodash.topath';
import Observable from '../observable';

type Path<T = string | number> = T | T[];

// todo
// type Action = Function & { bound?: boolean };
// type Actions = { [name in string | number | symbol]: Action };
type Actions = { [name in string | number | symbol]: any };

type ActionThis<ActionState, ObservableState> = {
  observable: Observable<ObservableState>;
  path: Path;
  state: ActionState;
  get: (path?: Path) => any;
  set: (data: any, path?: Path) => any;
};

type BoundType<T> = T & ThisType<T>;

type ActionsArg<T, ActionState = any, ObservableState = any> = T &
  Partial<ActionThis<ActionState, ObservableState>> &
  ThisType<T & ActionThis<ActionState, ObservableState>>;

type BoundActions<T, ActionState = any, ObservableState = any> = BoundType<
  T & ActionThis<ActionState, ObservableState>
>;

function concatPath(a: Path, b?: Path) {
  return [...toPath(a), ...toPath(b)];
}

function makeActions<T, ActionState = any, ObservableState = any>(
  actions: ActionsArg<T, ActionState, ObservableState>,
) {
  return actions as BoundActions<T, ActionState, ObservableState>;
}

function mergeActions<A, B>(a: A, b: B): A & B {
  const oa = Object.getOwnPropertyDescriptors(a);
  const ob = Object.getOwnPropertyDescriptors(b);
  return Object.create({}, { ...oa, ...ob });
}

export { Path, Actions, BoundActions, ActionThis, ActionsArg };
export { concatPath, makeActions, mergeActions };
