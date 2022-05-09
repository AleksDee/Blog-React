import React from 'react';

export default function MySelect({
  options,
  defaultValue,
  value,
  onSelectChange,
}) {
  return (
    <select
      value={value}
      onChange={(event) => onSelectChange(event.target.value)}
      name=""
      id=""
    >
      <option disabled value="">
        {defaultValue}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
