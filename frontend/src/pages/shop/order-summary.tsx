import { RootState } from '@/app/store/rootReducer';
import { AppDispatch } from '@/app/store/types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const OrderSummary = () => {
    const dispatch = useDispatch<AppDispatch>();
  const { tax, taxRate, totalPrice,  grandTotal, selectedItems } = useSelector(
    (store: RootState) => store.cart
  );

  const handleClearCart = () => {
    dispatch({ type: 'cart/clearCart' });
  }
  return (
    <div className="bg-[var(--primary-color-light)] p-4 text-base rounded-lg">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-2xl text-[var(--text-dark)]">Order Summary</h2>
        <p className="text-[var(--text-dark)] mt-2">Selected Items: {selectedItems}</p>
        <p className="text-[var(--text-dark)]">Total Price: ${totalPrice.toFixed(2)}</p>
        <p className="text-[var(--text-dark)]">Tax ({taxRate * 100}%): ${tax.toFixed(2)}</p>
        <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3>
        <div className="px-4 mb-6">
          <button 
          onClick={(e)=>{
            e.stopPropagation();
            handleClearCart();
          }}
          className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className="mr-2">Clear Cart</span>

            <i className='ri-delete-bin-7-line'/>
          </button>
          <button className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className="mr-2">Proceed Checkout </span>
            <i className='ri-bank-card-line'/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
