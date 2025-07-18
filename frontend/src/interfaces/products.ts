import { StaticImageData } from "next/image";

export interface Products {
     slug: number,
    name: string,
    category: string,
    description: string,
    price: number,
    oldPrice?: number,
     image: string | StaticImageData,
    color: string,
    rating: number,
    author?:string
    quantity?: number;
}