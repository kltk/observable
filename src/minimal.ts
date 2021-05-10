import { Listener, Minimal } from './types';

let id = 1;

function observable<State>(initial: State): Minimal<State> {
  const listeners = new Set<Listener<State>>();
  const data = { state: initial };

  return {
    id: id++,
    state: initial,
    getState() {
      return data.state;
    },
    setState(newState) {
      if (!Object.is(data.state, newState)) {
        data.state = newState;
        listeners.forEach((cb) => cb(newState));
      }
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    unsubscribe(listener) {
      listeners.delete(listener);
    },
  };
}

export { observable };
