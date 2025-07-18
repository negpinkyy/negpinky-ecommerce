import React from 'react'

const PromoBanner = () => {
  return (
    <section className="section__container promo__container flex md:flex-row flex-col ">
      <div className="banner__card">
        <span className=""> <i className="ri-truck-line"/> </span>
        <h4>Free Delivery</h4>
        <p className="">offers convenience and the ability to shop from anywhere, anytime</p>
      </div>
      <div className="banner__card">
        <span className=""> <i className="ri-money-dollar-circle-line"/> </span>
        <h4>100% Money Back Guaranty</h4>
        <p className="">E commerce have review system where customers can share feedback.</p>
      </div>
      <div className="banner__card">
        <span className=""> <i className="ri-user-voice-fill"/> </span>
        <h4>Shipping Support</h4>
        <p className="">offers customer support to assist customers with queries and issues</p>
      </div>
    </section>
  )
}

export default PromoBanner
