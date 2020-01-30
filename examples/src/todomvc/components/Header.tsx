import React from 'react';
import TodoInput from './TodoInput';
import useTodomvc from '../store/useTodomvc';

function Header() {
  const todos = useTodomvc();
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoInput onChange={todos.add} />
    </header>
  );
}

export default Header;
