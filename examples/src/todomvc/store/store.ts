import { create, makeActions } from 'kltk-observable';
import { getStorage, setStorage } from '../utils/storage';

const { todos } = getStorage();

const { observable, useObservable } = create({ todos });

observable.subscribe(setStorage);

export { makeActions, observable, useObservable };
