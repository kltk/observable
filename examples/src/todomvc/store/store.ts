import { create, makeActions } from 'kltk-observable';
import { getStorage, setStorage, subscribe } from '../utils/storage';

const { todos } = getStorage();
const { observable, useObservable } = create({ todos });

observable.subscribe(setStorage);
subscribe((data: any) => observable.set(data));

export { makeActions, observable, useObservable };
