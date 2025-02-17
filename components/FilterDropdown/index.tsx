import React from "react";

interface Bucket {
  value: string;
  count: number;
}

interface Facet {
  name: string;
  buckets: Bucket[];
}
interface FilterDropdownProps {
  facet: Facet;
  onFilterChange: (filter: Record<string, string>) => void;
}

function FilterDropdown({ facet, onFilterChange }: FilterDropdownProps) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = { [facet.name]: event.target.value };
    onFilterChange(newFilter);
  };

  return (
    <select className="filter-dropdown" onChange={handleChange}>
      <option value="">All</option>
      {facet.buckets.map((bucket) => (
        <option key={bucket.value} value={bucket.value}>
          {bucket.value} ({bucket.count})
        </option>
      ))}
    </select>
  );
}

export default FilterDropdown;
