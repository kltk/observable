import { observable } from './observable';

describe('observable', () => {
  test('initial', () => {
    const initial = 'state';
    const store = observable(initial);
    expect(store.state).toBe(initial);
  });

  test('must publish after assign new state', () => {
    const initial = '';
    const newState = 'new state';
    const store = observable(initial);
    const fn = jest.fn();
    store.subscribe(fn);
    store.state = newState;
    expect(fn).toBeCalledWith(newState);
  });

  test('must assign new state after setState', () => {
    const initial = '';
    const newState = 'new state';
    const store = observable(initial);
    const fn = jest.fn();
    store.subscribe(fn);
    store.setState(newState);
    expect(store.state).toBe(newState);
    expect(fn).toBeCalledWith(newState);
  });

  test('setState with function', () => {
    const initial = '';
    const newState = 'new state';
    const store = observable(initial);
    const fn = jest.fn();
    store.subscribe(fn);
    store.setState(() => newState);
    expect(store.state).toBe(newState);
    expect(fn).toBeCalledWith(newState);
  });

  test('the same listener will subscribe only once', () => {
    const initial = '';
    const newState = 'new state';
    const store = observable(initial);
    const fn = jest.fn();
    store.subscribe(fn);
    store.subscribe(fn);
    store.setState(newState);
    expect(fn).toBeCalledTimes(1);
  });

  test("don't publish when set same state", () => {
    const initial = '';
    const store = observable(initial);
    const fn = jest.fn();
    store.subscribe(fn);
    store.setState(initial);
    expect(fn).not.toBeCalled();
  });

  test("don't call listener after unsubscribe", () => {
    const initial = '';
    const newState = 'new state';
    const store = observable(initial);
    const fn = jest.fn();

    store.subscribe(fn);
    store.unsubscribe(fn);
    store.setState(newState);
    expect(fn).not.toBeCalled();

    const unsubscribe = store.subscribe(fn);
    unsubscribe();
    store.setState(newState);
    expect(fn).not.toBeCalled();
  });
});
