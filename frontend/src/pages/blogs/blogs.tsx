
import { blogs } from '@/data/blogs'
import React from 'react'
import Image from 'next/image'

const Blogs = () => {
  return (
    <section className='section__container blog__container'>
      <h2 className="section__header">Latest From Blog</h2>
      <p className="section__subheader m-12">Stay updated with the latest trends and insights in the world of fashion and lifestyle</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-12">
        {
          blogs.map((blog) =>(
            <div key={blog.id}
             className="blog__card cursor-pointer hover:scale-105 transition-all duration-300">
               <Image
               src={blog.imageUrl}
               alt={blog.title}
               />
               <div className="blog__card__content">
                <h6>{blog.subtitle}</h6>
                <h4>{blog.title}</h4>
                <p className="">{blog.date}</p>
               </div>
            </div>
          ))
        }
      </div>
    </section>
  )
}

export default Blogs
