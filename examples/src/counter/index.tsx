import { create, makeActions } from 'kltk-observable';
import React from 'react';
import './index.css';

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
    <div className="counter">
      <span>Clicked: {counter.state} times</span>
      <button onClick={counter.increment}>Increment</button>
      <button onClick={counter.decrement}>Decrement</button>
      <button onClick={counter.reset}>Reset</button>
    </div>
  );
}

export default Counter;
