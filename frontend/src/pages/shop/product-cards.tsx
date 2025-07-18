import React from 'react'
import { Products } from '@/interfaces/products';
import Link from 'next/link';
import Image from 'next/image';
import RatingStar from '@/components/rating-star';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/store/features/cart/cartSlice';
import { AppDispatch } from '@/app/store/types';

interface ProductCardsProps{
    products : Products[]
}


const ProductCards:React.FC<ProductCardsProps> = ({products}) => {
 const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: Products) => {
    dispatch(addToCart(product)); 
  };
    // console.log(products)
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {
        products.map((product,index)=>{
          return(
            <div key={index} className="product__card">
               <div className="relative">
                <Link href={`/shop/${product.slug}`}>
                <Image
                src={product.image}
                alt={product.name}
                className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300'
                />
                </Link>
                <button onClick={(e)=>{
                  e.stopPropagation();
                  handleAddToCart(product)}} className="hover:bg-black rounded-lg absolute top-3 right-3 ">
                  <i className="ri-shopping-cart-2-line bg-[var(--primary-color)] rounded-lg p-1.5 text-white hover:bg-[var(--primary-dark)]"/>
                </button>
               </div>
               {/* Product description */}
               <div className="product__card__content">
                <h4 className="">{product.name}</h4>
                <p className="" >
                  ${product.price}{product.oldPrice ? 
                  <s>${product?.oldPrice}</s>
                  :null
                  }
                </p>
                 {/* rating */}
                 <RatingStar rating={product.rating}/>
               </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductCards
