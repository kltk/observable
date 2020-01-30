import React from 'react';

interface FilterLinkProps {
  value: string;
  selected?: boolean;
  onChange: (filter: string) => void;
}

function FilterLink({ selected, value, onChange }: FilterLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const { text } = e.target as HTMLAnchorElement;
    onChange(text);
  };
  const className = selected ? 'selected' : undefined;
  return (
    <li>
      <a href={value} onClick={handleClick} className={className}>
        {value}
      </a>
    </li>
  );
}

export default FilterLink;
