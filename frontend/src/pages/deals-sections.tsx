import { images } from '@/assets/images'
import React from 'react'
import Image from 'next/image'

const DealsSections = ({}) => {
  return (
    <>
      <section className="section__container deals__container">
        <div className="deals__image">
            <Image
             src={images.deals}
              alt="Deals"
        />
        </div>
        <div className="deals__content">
            <h5>Get up to 20% Discount</h5>
            <h4>Deals of This  Month</h4>
            <p>Our Women&apos;s Fashion Deals of the Month are here to make tour style dreams a reality without breaking the bank.
                Discover a curated collection of exquisite clothing, accessories, and footwear, all handpicked to elevate your wardrobe
            </p>
            <div className="deals__countdown flex-wrap">
                <div className="deals__countdown__card">
                    <h4>14</h4>
                    <p>Days</p>
                    
                </div>
                <div className="deals__countdown__card">
                    <h4>20</h4>
                    <p>Hours</p>
                </div>
                <div className="deals__countdown__card">
                    <h4>15</h4>
                    <p>Mins</p>
                </div>
                <div className="deals__countdown__card">
                    <h4>05</h4>
                    <p>Secs</p>
                </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default DealsSections
