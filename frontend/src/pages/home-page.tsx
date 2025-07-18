import MainComponent from '@/components/MainComponent'
import React from 'react'
import Banner from './banner'
import Categories from './categories'
import HeroSection from './Hero-section'
import TrendingProduct from './shop/trending-product';
import DealsSections from './deals-sections'
import PromoBanner from './promo-banner'
import Blogs from './blogs/blogs'

const HomePage = () => {
  return (
    <MainComponent>
        <>
            <Banner/>
            <Categories/>
            <HeroSection/>
            <TrendingProduct/>
            <DealsSections/>
            <PromoBanner/>
            <Blogs/>

        </>
    </MainComponent>
  )
}

export default HomePage
