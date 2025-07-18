import { Post } from "@/interfaces/post";
import { images } from "@/assets/images";

export const blogs: Post[] = [
  {
    id: 1,
    title: "Mastering the Art of Capsule Wardrobes",
    subtitle: "Timeless Elegance",
    date: "12th August 2022",
    imageUrl: images.hangedClothes,
  },
  {
    id: 2,
    title: "Unveiling the Hottest Beachwear Trends",
    subtitle: "Summer Breeze",
    date: "18th January 2023",
    imageUrl: images.donutCup,
  },
  {
    id: 3,
    title: "Navigating the World of Women's Tailoring",
    subtitle: "Power Dressing",
    date: "5th January 2025",
    imageUrl: images.fashion,
  },
  {
    id: 4,
    title: "The World's Best Fashion Fair 2025",
    subtitle: "New York Times",
    date: "25th May 2025",
    imageUrl: images.fashionArts,
  },
];
