import Image from "next/image";
import Link from "next/link";
import React from "react";
import { images } from "@/assets/images";
import MainComponent from "@/components/MainComponent";

const Banner = () => {
  return (
    <>
      <MainComponent>
        <section className="section__container header__container ">
        <div className="header__content z-30">
          <h4 className="uppercase">UP TO 20% Discount on</h4>
          <h1 className="">Girl&apos;s fashion</h1>
          <p className="">
            Discover the latest trends and express your unique style with our
            women&apos;s Fashion website. Explore a curated collection of
            clothing accessories and footwear that caters to every taste and
            occasion.
          </p>
          <button className="btn">
            <Link href='/shop'>
               EXPLORE NOW
            </Link>
          </button>
        </div>
        <div className="header__image">
            <Image
            src={images.header}
            alt="Banner image"
            className=""
            />
        </div>
      </section>
      </MainComponent>
    </>
  );
};

export default Banner;
