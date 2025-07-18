import { images } from '@/assets/images'
import { Card } from '@/interfaces/cards'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection:React.FC = () => {
const cards : Card[] = [
    {
        id:1,
        image: images.card1,
        trend: "2024 Trend",
        title: "Womans Shirt"
    },
    {
        id:2,
        image: images.card2,
        trend: "2024 Trend",
        title: "Womans Dresses"
    },
    {
        id:3,
        image: images.card3,
        trend: "2024 Trend",
        title: "Womans Casuals"
    },
]

  return (
    <section className='section__container hero__container'>
      {
        cards.map(card =>{
            return(
             <div key={card.id} className="hero__card">
                <Image
                src={card.image}
                alt={card.title}
                />
                <div className="hero__content">
                    <p>{card.trend}</p>
                    <h4>{card.title}</h4>
                    <Link className='' href='/'>Discover More</Link>
                </div>
             </div>
            )
        })

        }
      
    </section>
  )
}

export default HeroSection
