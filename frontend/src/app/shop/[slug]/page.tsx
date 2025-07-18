"use client";
import { images } from "@/assets/images";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import RatingStar from "@/components/rating-star";

const ProductPage = () => {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  return (
    <>
      <section className="section__container bg-[var(--primary-color-light)]">
        <h2 className="section__header">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-[var(--primary-color)]">
            <Link href="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line" />
          <span className="hover:text-[var(--primary-color)]">
            <Link href="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line" />
          <span className="hover:text-[var(--primary-color)]">
            {slug ? (Array.isArray(slug) ? slug.join(", ") : slug) : "Product"}
          </span>
        </div>
      </section>
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full">
            <Image
              src={images.card1}
              alt="Product Image"
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>
          <div className="">
            <h3 className="text-2xl font-semibold mb-4 ">Product Name</h3>
            <p className="text-xl text-[var(--primary-color)]">
              $100 <s>1300</s>
            </p>
            <p className="text-gray-700 mb-4">This is an product description</p>
          </div>
          {/* Additional product */}
          <p className="">
            <strong>Category:</strong> Accessories
          </p>
          <p className="">
            <strong>Color:</strong> Beige
          </p>
          <div className="flex gap-1 items-center">
            <strong>Rating</strong>
            <RatingStar rating={4} />
          </div>
          <button className="mt-6 px-6 py-3 bg-[var(--primary-color) text-white]">
            Add to cart
          </button>
        </div>
      </section>
      {/* Display reviews */}
      <section className="section__container mt-8">Reviews Here</section>
    </>
  );
};

export default ProductPage;
