// src/pages/cart/EmptyCart.jsx
export const EmptyCart = ({ onContinueShopping }) => {
  return (
    <div className="text-center text-gray-600 text-lg">
      <p className="mb-4">Your cart is empty.</p>
      <button
        onClick={onContinueShopping}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300 ease-in-out shadow-lg hover:shadow-xl"
      >
        Continue Shopping
      </button>
    </div>
  );
};