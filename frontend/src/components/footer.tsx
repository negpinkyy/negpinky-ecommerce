import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { images } from '@/assets/images'

const Footer = () => {
  return (
    <>
      <footer className='section__container footer__container'>
       <div className="footer__col ">
        <h4>CONTACT INFO</h4>
        <p className="">
            <span>
                <i className="ri-map-pin-2-line"/>
            </span>
                1234 Street Lekki phase 1, lagos
        </p>
        
        <p>
            <span>
                <i className="ri-mail-fill"/>
              
            </span>
              negpinky@gmail.com
        </p>
        <p>
            <span>
                <i className="ri-phone-fill"/>
               
            </span>
             +234 123 456 7890
        </p>
       </div>
       <div className="footer__col">
            <h4>Company</h4>
            <Link href="/">Home</Link>
            <Link href="/">About Us</Link>
            <Link href="/">Work With Us</Link>
            <Link href="/">Our Blogs</Link>
            <Link href="/">Teams & condition</Link>
       </div>
         <div className="footer__col">
                <h4>USEFUL Links</h4>
                <Link href="/">Help</Link>
                <Link href="/">Track your order</Link>
                <Link href="/">Men</Link>
                <Link href="/">Women</Link>
                <Link href="/">Dresses</Link>
                </div>
         <div className="footer__col">
            <h4>INSTAGRAM</h4>
            <div className="instagram__grid">
<Image
src={images.instagram1}
alt='Instagram Image 1'
/>
<Image
src={images.instagram2}
alt='Instagram Image 2'
/>
<Image
src={images.instagram3}
alt='Instagram Image 3'
/>
<Image
src={images.instagram4}
alt='Instagram Image 4'
/>
<Image
src={images.instagram5}
alt='Instagram Image 5'
/>
<Image
src={images.instagram6}
alt='Instagram Image 6'
/>
            </div>
    </div>
      </footer>
      <div className="footer__bar">
        copyright &copy; {new Date().getFullYear()} Negpinky. All rights reserved.
      </div>
    </>
  )
}

export default Footer


