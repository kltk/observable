import { useObservable, makeActions } from './store';
import { Todos } from '../utils/types';

const actions = makeActions({
  filter(todos: Todos) {
    const { state } = this;
    return todos.filter(todo => {
      if (state === 'All') return true;
      if (state === 'Active') return !todo.completed;
      if (state === 'Completed') return todo.completed;
    });
  },
});

function useFilter(initial?: string) {
  return useObservable(actions, 'todos.filter', initial);
}

export default useFilter;
