export interface PriceRange {
  label: string;
  min: number;
  max: number;
}

export interface FilterState {
  category: string;
  color: string;
  priceRange: PriceRange;
}
