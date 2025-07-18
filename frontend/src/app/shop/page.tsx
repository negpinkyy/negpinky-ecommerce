"use client";

import React, { useEffect, useState } from "react";
import { products } from "@/data/products";
import { Products } from "@/interfaces/products";
import { PriceRange, FilterState } from "@/interfaces/filters";
import { categories } from "@/data/categories";
import ProductCards from "@/pages/shop/product-cards";
import ShopFiltering from "@/pages/shop/shop-filtering";

// Define available filters
const colors = ["all", "black", "blue", "red", "silver", "beige", "green"];
const priceRanges: PriceRange[] = [
  { label: "under $50", min: 0, max: 50 },
  { label: "$50-$100", min: 50, max: 100 },
  { label: "$100-$200", min: 100, max: 200 },
  { label: "$200 and above", min: 200, max: Infinity },
];

const filters = {
  categories: [ ...categories],
  colors,
  priceRanges: [{ label: "All", min: 0, max: Infinity }, ...priceRanges],
};

const Shop: React.FC = () => {
  const [productsData, setProductsData] = useState<Products[]>(products);

  const [filterState, setFilterState] = useState<FilterState>({
    category: "all",
    color: "all",
    priceRange: { label: "All", min: 0, max: Infinity },
  });

  // Filter products whenever filterState changes
  useEffect(() => {
    const applyFilter = () => {
      let filteredProducts = products;

      if (filterState.category !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === filterState.category
        );
      }

      if (filterState.color !== "all") {
        filteredProducts = filteredProducts.filter(
          (product) => product.color === filterState.color
        );
      }

      if (filterState.priceRange) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            product.price >= filterState.priceRange.min &&
            product.price <= filterState.priceRange.max
        );
      }

      setProductsData(filteredProducts);
    };

    applyFilter();
  }, [filterState]);

  // Clear filters
  const clearFilters = () => {
    setFilterState({
      category: "all",
      color: "all",
      priceRange: { label: "All", min: 0, max: Infinity },
    });
  };

  return (
    <>
      <section className="section__container bg-[var(--primary-color-light)]">
        <h2 className="section__header">Shop Page</h2>
        <p className="section__subheader">
          Discover the hottest picks: elevate your style with our curated collection of trending women&apos;s fashion products!
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Left side: Filters */}
          <div>
          <ShopFiltering
            filters={filters}
            filterState={filterState}
            setFilterState={setFilterState}
            clearFilters={clearFilters}
          />
          </div>

          {/* Right side: Products */}
          <div className="flex-1">
            <h3 className="text-xl font-medium mb-4">
              Products Available: {productsData.length}
            </h3>
            <ProductCards products={productsData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
