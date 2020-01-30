import { Todos } from '../utils/types';
import { makeActions, useObservable } from './store';

const defaultTodos = [
  { id: 1, completed: true, text: 'Kltk Observable' },
  { id: 2, completed: false, text: 'a simple observable & react hooks ' },
];

const actions = makeActions({
  get state() {
    return this.get() as Todos;
  },
  add(text: string) {
    if (!text) return;

    const newTodo = { id: Date.now(), completed: false, text };
    this.set([...this.state, newTodo]);
  },
  del(id: number) {
    this.set(this.state.filter((todo: any) => todo.id !== id));
  },
  setTodo(id: number, todo: any) {
    const index = this.state.findIndex((todo: any) => todo.id === id);
    this.set({ ...this.state[index], ...todo }, index);
  },

  edit(id: number, text: string) {
    this.setTodo(id, { text });
  },
  complete(id: number, completed: boolean) {
    this.setTodo(id, { completed });
  },
  completeAll(completed: boolean) {
    this.set(this.state.map((todo: any) => ({ ...todo, completed })));
  },
  clearCompleted() {
    this.set(this.state.filter((todo: any) => !todo.completed));
  },
});

function useTodomvc() {
  return useObservable(actions, 'todos.data', defaultTodos);
}

export default useTodomvc;
