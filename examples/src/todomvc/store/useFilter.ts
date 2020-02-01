import { useObservable, makeActions } from './store';
import { Todos } from '../utils/types';

enum types {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

const actions = makeActions({
  filter(todos: Todos) {
    const { state } = this;
    return todos.filter(todo => {
      if (state === types.Active) return !todo.completed;
      if (state === types.Completed) return todo.completed;
      // if (state === types.All)
      return true;
    });
  },

  map(fn: (type: string) => void) {
    return Object.keys(types).map(fn);
  },
});

function useFilter() {
  return useObservable(actions, 'todos.filter', types.All);
}

export default useFilter;
