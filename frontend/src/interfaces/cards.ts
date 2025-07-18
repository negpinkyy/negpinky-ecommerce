import { StaticImageData } from "next/image";

export interface Card{
    id:number,
    image: string | StaticImageData,
    title: string,
    trend: string
}