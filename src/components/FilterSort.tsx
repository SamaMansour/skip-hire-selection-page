import React from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';

interface FilterSortProps {
  sortBy: 'size' | 'price';
  sortOrder: 'asc' | 'desc';
  showRoadOnly: boolean;
  showHeavyWasteOnly: boolean;
  onSortChange: (by: 'size' | 'price', order: 'asc' | 'desc') => void;
  onFilterChange: (road: boolean, heavyWaste: boolean) => void;
}

export const FilterSort: React.FC<FilterSortProps> = ({
  sortBy,
  sortOrder,
  showRoadOnly,
  showHeavyWasteOnly,
  onSortChange,
  onFilterChange
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split('-') as ['size' | 'price', 'asc' | 'desc'];
              onSortChange(by, order);
            }}
            className="text-sm border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="size-asc">Size (Small to Large)</option>
            <option value="size-desc">Size (Large to Small)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
          </select>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showRoadOnly}
              onChange={(e) => onFilterChange(e.target.checked, showHeavyWasteOnly)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Road Allowed Only</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showHeavyWasteOnly}
              onChange={(e) => onFilterChange(showRoadOnly, e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Heavy Waste Only</span>
          </label>
        </div>
      </div>
    </div>
  );
};