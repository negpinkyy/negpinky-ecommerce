import { StaticImageData } from "next/image";

export interface Category {
    name:string,
    path:string,
    image:string |  StaticImageData
}