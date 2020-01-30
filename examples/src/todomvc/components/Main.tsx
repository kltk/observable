import React from 'react';
import TodoList from './TodoList';
import CheckAll from './CheckAll';
import useTodomvc from '../store/useTodomvc';
import useFilter from '../store/useFilter';

function Main() {
  const todos = useTodomvc();
  const filter = useFilter();
  return (
    <section className="main">
      <CheckAll data={todos.state} onChange={todos.completeAll} />
      <TodoList data={filter.filter(todos.state)} />
    </section>
  );
}

export default Main;
