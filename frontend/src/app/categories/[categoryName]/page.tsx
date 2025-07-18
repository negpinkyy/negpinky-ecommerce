"use client";
import { products } from '@/data/products';
import React, { useEffect, useState } from 'react';
import { Products } from '@/interfaces/products'; 
import ProductCards from '@/pages/shop/product-cards';

interface CategoryPageProps {
  params: {
    categoryName: string;
  };
}

// ✅ Filtering function outside
const filterProducts = (categoryName: string) => {
  return products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );
};

const CategoryPage: React.FC<CategoryPageProps> = ({ params }) => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);

  useEffect(() => {
    setFilteredProducts(filterProducts(params.categoryName));
  }, [params.categoryName]);

  useEffect(()=>(
    window.scrollTo(0, 0)
  ))

  return (
    <>
    <section className="section__container bg-[var(--primary-color-light)] ">
      <h2 className='section__header'>{params.categoryName}</h2>
      <p className="section__subheader">
        Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
      </p>
    </section>
   <div className="section__container mt-12">
     <ProductCards products={filteredProducts}/>
   </div>
    </>
  );
};

export default CategoryPage;
