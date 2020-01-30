import React from 'react';
import FilterLink from './FilterLink';
import useTodomvc from '../store/useTodomvc';
import useFilter from '../store/useFilter';

const filters = ['All', 'Active', 'Completed'];

function Footer() {
  const filter = useFilter(filters[0]);

  const todos = useTodomvc();
  const itemWord = todos.state.length > 1 ? 'items' : 'item';

  const haveCompleted = !!todos.state.find(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todos.state.length}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {filters.map(f => (
          <FilterLink
            value={f}
            selected={f === filter.state}
            onChange={filter.set.bind(filter)}
          />
        ))}
      </ul>
      {haveCompleted && (
        <button className="clear-completed" onClick={todos.clearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}

export default Footer;
