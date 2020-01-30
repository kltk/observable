import React from 'react';
import TodoItem from './TodoItem';
import { Todos } from '../utils/types';

interface TodoListProps {
  data: Todos;
}

function TodoList({ data }: TodoListProps) {
  return (
    <ul className="todo-list">
      {data.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
