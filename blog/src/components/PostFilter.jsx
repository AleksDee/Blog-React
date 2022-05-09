import React from 'react';
import MyInput from './UI/button/input/MyInput';
import MySelect from './UI/select/MySelect';

export default function PostFilter({ filter, setFilter }) {
  return (
    <div>
      <MyInput
        value={filter.searchQuery}
        onChange={(e) => setFilter({ ...filter, searchQuery: e.target.value })}
      />
      <MySelect
        value={filter.selectedSort}
        onSelectChange={(e) => setFilter({ ...filter, selectedSort: e })}
        defaultValue="Сортировать по..."
        options={[
          { name: 'По названию', value: 'title' },
          { name: 'По описанию', value: 'body' },
        ]}
      />
    </div>
  );
}
