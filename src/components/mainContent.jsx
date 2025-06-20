import { ProductList } from "./productList";
import { CartPage } from "../pages/cart/cartPage";
import { ContactUs } from "../pages/contactUs";

// src/components/MainContent.jsx
export const MainContent = ({ currentPage, products, cartItems, onAddToCart, onUpdateQuantity, onRemoveItem, onNavigate }) => {
  return (
    <main className="flex-grow">
      {currentPage === 'products' && (
        <ProductList products={products} onAddToCart={onAddToCart} />
      )}
      {currentPage === 'cart' && (
        <CartPage
          cartItems={cartItems}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
          onContinueShopping={() => onNavigate('products')}
        />
      )}
      {currentPage === 'contact' && (
        <ContactUs />
      )}
    </main>
  );
};