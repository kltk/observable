import React, { ChangeEvent } from 'react';

interface TodoInputProps {
  value?: string;
  onChange: (text: string) => void;
}

enum KEYS {
  ENTER = 0x0d, // submit
  ESC = 0x1b, // cancel
}

function TodoInput({ onChange, value = '' }: TodoInputProps) {
  const [state, setState] = React.useState(value);
  const editing = !!value;

  const handleSubmit = () => {
    onChange(state.trim());
    setState('');
  };

  const handleCancel = () => {
    onChange(value);
  };

  const handlePress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.which === KEYS.ENTER) return handleSubmit();
    if (e.which === KEYS.ESC) return handleCancel();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(value);
  };

  return (
    <input
      className={editing ? 'edit' : 'new-todo'}
      placeholder="What needs to be done?"
      autoFocus
      value={state}
      onKeyDown={handlePress}
      onChange={handleChange}
      onBlur={editing ? handleSubmit : undefined}
    />
  );
}

export default TodoInput;
