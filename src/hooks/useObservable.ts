import Observable from '../observable';
import useActions from './useActions';
import useState from './useState';
import { Path, Actions, BoundActions } from './utils';

function useObservable<
  T extends Actions,
  ActionState = any,
  ObservableState = any
>(
  observable: Observable<ObservableState>,
  actions: BoundActions<T, ActionState, ObservableState>,
  path?: Path,
  initial?: any,
) {
  useState(observable, path, initial);
  return useActions(observable, actions, path);
}

export default useObservable;
