import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const ProductCard = ({ product }) => {
  const { addToCart, cartItems } = useContext(ShopContext);
  const cartItemCount = cartItems?.[product.id] || 0;

  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover rounded-t-lg"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/CCCCCC/333333?text=Image+Error`; }}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full transition duration-300 ease-in-out shadow-md hover:shadow-lg"
            onClick={() => addToCart(product.id)}
          >
            Add to Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
          </button>
        </div>
      </div>
    </div>
  );
};