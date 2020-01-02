import React from 'react';
import Observable from '../observable';
import { Path } from './utils';

function useState<ObservableState = any>(
  observable: Observable<ObservableState>,
  path?: Path,
  initial?: any,
) {
  const [state, setState] = React.useState(() => {
    if (observable.get(path) === undefined) {
      observable.set(initial, path);
    }
    return observable.get(path);
  });

  React.useEffect(
    () => observable.subscribe(() => setState(observable.get(path))),
    [observable],
  );
  return state;
}

export default useState;
