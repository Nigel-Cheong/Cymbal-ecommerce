// import "./App.css";
import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ProductList } from "./components/productList";
import { products } from "./products";
import CartPage from "./pages/cart/cartPage";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('products'); // 'products' or 'cart' or 'contact'

  // Calculate total items in cart for header display
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const handleAddToCart = (productToAdd) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) => {
      if (newQuantity <= 0) {
        // If quantity is 0 or less, remove the item
        return prevItems.filter((item) => item.id !== productId);
      }
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased flex flex-col">
      <Header cartItemCount={cartItemCount} onNavigate={handleNavigate} />
      <main className="flex-grow"> {/* Flex-grow to push footer to bottom */}
        {currentPage === 'products' && (
          <ProductList products={products} onAddToCart={handleAddToCart} />
        )}
        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onContinueShopping={() => handleNavigate('products')}
          />
        )}
        {currentPage === 'contact' && (
            <div className="container mx-auto py-12 px-4 text-center">
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Contact Us</h2>
                <p className="text-lg text-gray-700">
                    Feel free to reach out to us with any questions or feedback.
                </p>
                <p className="text-md text-gray-600 mt-4">
                    Email: support@cymbalsboutique.com
                </p>
                <p className="text-md text-gray-600">
                    Phone: +1 (123) 456-7890
                </p>
            </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
