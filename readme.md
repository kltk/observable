# kltk Observable

a simple observable data & react hooks

## Installtion

```shell
npm install kltk-observable
```

## Example

```tsx
import { create, makeActions } from 'kltk-observable';

const { useObservable } = create(0);

// optional, make actions for typescript, just return
const actions = makeActions({
  // optional, redefine state type for typescript
  get state() {
    return this.get() as number;
  },

  increment() {
    this.set(this.state + 1);
  },

  decrement() {
    this.set(this.state - 1);
  },

  reset() {
    this.set(0);
  },
});

function Counter() {
  const counter = useObservable(actions);
  return (
    <div>
      {counter.state}
      <button onClick={counter.increment}>Increment</button>
      <button onClick={counter.decrement}>Decrement</button>
      <button onClick={counter.reset}>Reset</button>
    </div>
  );
}
```

## API

```tsx
import Observable from 'kltk-observable'
import { useState, useActions, useObservable } from 'kltk-observable'
import { create, makeActions } from 'kltk-observable'
```

### `new Observable(initial)`

create a observable

### `useState(observable, path, initial)`

get state of path and subscribe it

### `useActions(observable, actions, path)`

bound context for actions

### `useObservable(observable, actions, path, initial)`

combo useState & useActions

### `create(initial)`

create a observable and return bound observable hooks, **recommend**

### `makeActions(actions)`

make actions for typescript, just return
