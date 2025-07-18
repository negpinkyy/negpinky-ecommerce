import { Products } from "@/interfaces/products";
import React from "react";
import Image from "next/image";
import OrderSummary from './order-summary';
import { AppDispatch } from "@/app/store/types";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/app/store/features/cart/cartSlice";

interface CartModalProps {
  products: Products[];
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ products, isOpen, onClose }) => {


    const dispatch = useDispatch<AppDispatch>();
    const handleQuantityChange = (type: 'increment' | 'decrement', slug: number) => {
       const payload = { type, slug: String(slug) };
       dispatch(updateQuantity(payload));
    };
    const handleRemoveFromCart = (e: React.MouseEvent<HTMLButtonElement>, product: Products) => {
        e.preventDefault()
        dispatch(removeFromCart(product)); 
    }


  return (
    <div
      className={`fixed z-50 inset-0 bg-black/80 backdrop-blur-md transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 0.3s ease-in-out" }}
    >
      <div
        className={`fixed m-4 rounded-lg right-0 top-0 md:w-1/3 w-full h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          background: "rgba(255, 255, 255,0.7)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold ">Your Cart</h4>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
            >
              <i className="ri-xrp-fill text-xl rounded-full bg-black" />
            </button>
          </div>
          
          {/* Cart details */}
          <div className="cart-items">
            {products.length === 0 ? (
              <p className="text-black/70 text-center py-8">Your cart is empty</p>
            ) : (
              products.map((product, index) => (
                <div key={index} className="bg-white/9 rounded-lg border mb-4 border-white/90  flex flex-col md:flex-row  md:items-center md:justify-between  p-2 md:p-  ">
                 <div className="flex items-center ">
                    <span className="mr-2 px-1 bg-[var(--primary-color)] text-white rounded-full">0{index+1}</span>

                    <div className="">
                        <Image
                    src={product.image}
                    alt={product.name}
                    className="object-cover m- rounded-lg"
                    />
                    </div>
                    <div className="ml-7">
                        <div className="">
                        <h5 className="text-lg font-medium text-nowrap text-ellipsis w-5">{product.name}</h5>
                        
                    </div>
                    <div className="flex flex-row md:justify-start items-center mt-2 ">
                        <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
                        <button 
                        onClick={() => handleQuantityChange('decrement', product.slug)}
                        className="size-6 flex items-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-[var(--primary-color)] hover:text-white ml-8">-</button>
                        <span className="px-2 text-center  mx-1">{product.quantity}</span>
                        <button 
                        onClick={() => handleQuantityChange('increment', product.slug)}
                        className="size-6 flex items-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-[var(--primary-color)] hover:text-white ">+</button>
                        <div className="ml-5">
                            <button
                            onClick={(e) => handleRemoveFromCart(e, product)}
                            className="text-red-500 hover:text-red-800 mr-4">Remove</button>
                        </div>
                    </div>
                    </div>
                 </div>
                 
                </div>
              ))
            )}
          </div>
            {/* Cart total */}
            {
                products.length > 0 &&(
                    <OrderSummary/>
                )
            }
        </div>
      </div>
    </div>
  );
};

export default CartModal;