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
});

function Counter() {
  const counter = useObservable(actions);
  return <button onClick={counter.increment}>{counter.state} clicked</button>;
}
```

## API

### `create(initial)`

create a observable and return bound hooks

### `useObservable(actions, path, initial)`

get a actions context with path

### `makeActions(actions)`

make actions for typescript, just return

### `context#path`

### `context#state`

### `context#get(subPath)`

### `context#set(data, subPath)`
