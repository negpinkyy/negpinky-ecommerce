"use client"

import React, { useState } from 'react'
import ProductCards from './product-cards'
import { products } from '@/data/products';


const TrendingProduct = () => {
const [ visibleProducts, setVisibleProducts ] = useState(8);
const loadMoreProducts = ()=>{
    setVisibleProducts(prevCount => prevCount + 4)
}
const resetProducts = () => {
    setVisibleProducts(8)
  }

  return (
    <section className='section__container product__container'>
        <h2 className="section__header">Trending Products</h2>
        <p className="section__subheader m-12">Discover the hottest picks: Elevate your style with our curated collection of Trending women&apos;s Fashion Product</p>
        {/* Products Cards */}
<div className="mt-12">
          <ProductCards products={products.slice(0, visibleProducts)}/>
</div>

        {/* Load More button */}
        <div className="product__btn">
        {
          visibleProducts < products.length ? (
            <button className="btn" onClick={loadMoreProducts}>
          Load More
             </button>
          ) : (
            <button className="btn" onClick={resetProducts}>Close</button>
          )
        }
        </div>
      
    </section>
  )
}

export default TrendingProduct
