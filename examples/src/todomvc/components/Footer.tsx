import React from 'react';
import FilterLink from './FilterLink';
import useTodomvc from '../store/useTodomvc';
import useFilter from '../store/useFilter';

function Footer() {
  const filter = useFilter();

  const todos = useTodomvc();
  const itemWord = todos.state.length > 1 ? 'items' : 'item';

  const haveCompleted = !!todos.state.find(todo => todo.completed);

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{todos.state.length}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {filter.map(type => (
          <FilterLink
            key={type}
            value={type}
            selected={type === filter.state}
            onChange={filter.set}
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
