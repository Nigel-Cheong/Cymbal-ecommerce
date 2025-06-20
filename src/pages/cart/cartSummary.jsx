// src/pages/cart/CartSummary.jsx
export const CartSummary = ({ cartItems, onContinueShopping }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    console.log('Proceed to Checkout (functionality to be implemented with custom modal!)');
  };

  return (
    <>
      <div className="flex justify-end items-center mt-8 pt-4 border-t border-gray-200">
        <span className="text-3xl font-bold text-gray-900 mr-6">Total: ${calculateTotal().toFixed(2)}</span>
        <button
          onClick={handleCheckout}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
          Proceed to Checkout
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={onContinueShopping}
          className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 transition duration-300 ease-in-out"
        >
          &larr; Continue Shopping
        </button>
      </div>
    </>
  );
};