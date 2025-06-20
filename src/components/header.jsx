// src/components/header.jsx
import React from 'react';

export const Header = ({ cartItemCount, onNavigate }) => {
  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <a href="#" onClick={() => onNavigate('products')} className="text-2xl font-extrabold tracking-tight text-white hover:text-gray-300 transition duration-300">
          Cymbal Boutique
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" onClick={() => onNavigate('products')} className="hover:text-gray-300 transition duration-300 font-medium">Home</a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate('products')} className="hover:text-gray-300 transition duration-300 font-medium">Products</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition duration-300 font-medium">About</a>
            </li>
            <li>
              <a href="#" onClick={() => onNavigate('contact')} className="hover:text-gray-300 transition duration-300 font-medium">Contact</a>
            </li>
            {/* Cart Icon */}
            <li>
              <a href="#" onClick={() => onNavigate('cart')} className="hover:text-gray-300 transition duration-300 font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.769.743 1.769H19a2 2 0 002-2v-2.293c0-.63-.184-1.769-.743-1.769L17 13m-2-4h2m-4 0h2" />
                </svg>
                Cart ({cartItemCount})
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
