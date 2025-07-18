import { StaticImageData } from "next/image";

export interface Post{
    id: number,
    title: string,
    subtitle: string,
    date: string,
    imageUrl: string | StaticImageData,
}