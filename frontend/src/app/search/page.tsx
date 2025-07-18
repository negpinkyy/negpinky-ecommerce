"use client";
import { products } from "@/data/products";
import { Products } from "@/interfaces/products";
import ProductCards from "@/pages/shop/product-cards";
import React, { useState } from "react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] =
    useState<Products[]>(products);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const result = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    setFilteredProducts(result);
  };

  return (
    <>
      <section className="section__container bg-[var(--primary-color-light)] ">
        <h2 className="section__header">Search Products</h2>
        <p className="section__subheader">
          Browse a diverse range of categories, from chic dresses to versatile
          accessories. Elevate your style today!
        </p>
      </section>
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Products..."
            className="search-bar w-full max-w-4xl p-2 border rounded "
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto text-white py-2 px-8 bg-[var(--primary-color-dark)]"
          >
            button
          </button>
        </div>
        <ProductCards products={filteredProducts} />
      </section>
    </>
  );
};

export default Search;
