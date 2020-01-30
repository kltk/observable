import React from 'react';
import { Todo } from '../utils/types';
import TodoInput from './TodoInput';
import Check from './Check';
import useTodomvc from '../store/useTodomvc';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const todos = useTodomvc();

  const handleCheck = (checked: boolean) => todos.complete(todo.id, checked);

  const handleDelete = () => todos.del(todo.id);

  const [editing, setEditing] = React.useState(false);

  const handleEdit = () => setEditing(true);

  const handleChange = (text: string) => {
    setEditing(false);
    if (!text) {
      todos.del(todo.id);
    }
    if (text !== todo.text) {
      todos.edit(todo.id, text);
    }
  };

  const className = editing ? 'editing' : todo.completed ? 'completed' : '';
  return (
    <li className={className}>
      <div className="view">
        <Check
          className="toggle"
          checked={todo.completed}
          onChange={handleCheck}
        />
        <label onDoubleClick={handleEdit}>{todo.text}</label>
        <button className="destroy" onClick={handleDelete}></button>
      </div>
      {editing && <TodoInput onChange={handleChange} value={todo.text} />}
    </li>
  );
}

export default TodoItem;
