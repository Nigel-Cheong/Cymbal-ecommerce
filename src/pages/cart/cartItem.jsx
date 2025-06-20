// src/pages/cart/CartItem.jsx
export const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center py-4 border-b last:border-b-0">
      <div className="flex items-center col-span-2">
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-20 h-20 object-cover rounded-lg mr-4"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/200x200/CCCCCC/333333?text=Image+Error`; }}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
          <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
        </div>
      </div>
      <div className="flex justify-between items-center text-gray-800">
        <div className="flex items-center w-1/3 justify-center">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-full disabled:opacity-50"
          >
            -
          </button>
          <span className="mx-2 font-bold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-3 rounded-full"
          >
            +
          </button>
        </div>
        <span className="text-right font-bold w-1/3">${(item.price * item.quantity).toFixed(2)}</span>
        <div className="w-1/3 flex justify-end">
            <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-300"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
      </div>
    </div>
  );
};