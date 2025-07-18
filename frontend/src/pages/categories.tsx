import { images } from '@/assets/images'
import MainComponent from '@/components/MainComponent'
import { Category } from '@/interfaces/categories'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Categories: React.FC = () => {
   const categories: Category[] = [
    {
        name: 'Accessories',
        path: 'Accessories',
        image: images.category1
    },
     {
        name: 'Dress Collection',
        path: 'Dress',
        image: images.category2
    },
     {
        name: 'Jewelry',
        path: 'Jewelry',
        image: images.category3
    },
     {
        name: 'Cosmetics',
        path: 'Cosmetics',
        image: images.category4
    },
   ]

  return (
   <MainComponent>
     <div className="product__grid">
      {
        categories.map((category, index)=>{
            return (
                <Link
                 key={index} 
                 href={`/categories/${category.path}`}
                 className='categories__card'
                 >
                    <Image
                    src={category.image}
                    alt={category.name}
                    />
                    <h4>{category.name}</h4>
                </Link>

            )
        })
      }
      
    </div>
   </MainComponent>
  )
}

export default Categories
