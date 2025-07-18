import { Products } from "@/interfaces/products";

export interface CartItem {
    slug: string;
    quantity: number;
    products: Products[];
    price: number;   
 
}

export interface CartState {
  products: (Products & { quantity: number })[];
  totalPrice: number;
  selectedItems: number;
  tax: number;
  taxRate: number;
  grandTotal: number;
}


// export interface CartState {
//   products: CartItem[];
//   totalPrice: number;
//   tax: number;
//   taxRate: number;
//   grandTotal: number;
//   selectedItems: number;

// }
