// components/FilterSection.tsx
import React from 'react';

type Props = {
  filterDays: number | null;
  onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterSection: React.FC<Props> = ({ filterDays, onFilterChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="filterDays" className="block mb-2 text-gray-800 dark:text-gray-300">筛选出剩余天数小于等于输入值的订单</label>
      <input
        type="number"
        id="filterDays"
        value={filterDays ?? ''}
        onChange={onFilterChange}
        placeholder="请输入天数"
        className="px-4 py-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default FilterSection;
