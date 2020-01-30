import React from 'react';
import Check from './Check';
import { Todos } from '../utils/types';

interface CheckAllProps {
  data: Todos;
  onChange: (checked: boolean) => void;
}

function CheckAll({ data, onChange }: CheckAllProps) {
  const isAllCompleted = !data.find(todo => !todo.completed);
  return (
    <>
      <Check
        id="toggle-all"
        className="toggle-all"
        onChange={onChange}
        value={isAllCompleted}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
}

export default CheckAll;
