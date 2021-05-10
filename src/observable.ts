import produce from 'immer';
import { extend } from './extend';
import { observable as minimal } from './minimal';
import { Observable } from './types';

export function observable<State>(initial: State): Observable<State> {
  const context = minimal(initial);
  const { getState, setState } = context;

  return extend(context, {
    get state() {
      return getState();
    },
    set state(newState) {
      setState(newState);
    },
    getState(getter) {
      return getter(getState());
    },
    setState(recipe) {
      if (recipe instanceof Function) {
        setState(produce(getState(), recipe));
      } else {
        setState(recipe);
      }
    },
  } as Observable<State>);
}
