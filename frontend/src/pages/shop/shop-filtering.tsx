import React from "react";
import { FilterState, PriceRange } from "@/interfaces/filters";

interface ShopFilteringProps {
  filters: {
    categories: string[];
    colors: string[];
    priceRanges: PriceRange[];
  };
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  clearFilters: () => void;
}

const ShopFiltering: React.FC<ShopFilteringProps> = ({
  filters,
  filterState,
  setFilterState,
  clearFilters,
}) => {
  return (
    <div>
      <div className="space-y-5 flex-shrink-0">
        <h3 className="font-semibold text-lg">Filters</h3>

        {/* Categories */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Category</h4>
          <hr />
          {filters.categories.map((category) => (
            <label key={category} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={filterState.category === category}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="mr-1"
              />
              {category}
            </label>
          ))}
        </div>

        {/* Colors */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Color</h4>
          <hr />
          {filters.colors.map((color) => (
            <label key={color} className="capitalize cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                checked={filterState.color === color}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    color: e.target.value,
                  }))
                }
                className="mr-1"
              />
              {color}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-medium text-lg">Price Range</h4>
          <hr />
          {filters.priceRanges.map((range) => (
            <label key={range.label} className="cursor-pointer">
              <input
                type="radio"
                name="priceRange"
                value={range.label}
                checked={filterState.priceRange.label === range.label}
                onChange={() =>
                  setFilterState((prev) => ({
                    ...prev,
                    priceRange: range,
                  }))
                }
                className="mr-1"
              />
              {range.label}
            </label>
          ))}
        </div>

        {/* Clear filters */}
        <button
          onClick={clearFilters}
          className="bg-[var(--primary-color)] py-1 px-2 text-white rounded mt-4"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default ShopFiltering;
