import React from 'react';

type HTMLCheckProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type CheckProps = {
  value?: boolean;
  onChange: (checked: boolean) => void;
} & Omit<HTMLCheckProps, 'onChange' | 'value'>;

function Check({ value, onChange, ...props }: CheckProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e.target.checked);

  return (
    <input checked={value} onChange={handleChange} type="checkbox" {...props} />
  );
}

export default Check;
