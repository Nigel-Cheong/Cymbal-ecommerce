import { EmptyCart } from "./emptyCart";
import { CartItem } from "./cartItem";
import { CartSummary } from "./cartSummary";

export const CartPage = ({ cartItems, onUpdateQuantity, onRemoveItem, onContinueShopping }) => {
  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-180px)]">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <EmptyCart onContinueShopping={onContinueShopping} />
      ) : (
        <div className="bg-white rounded-lg shadow-xl p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 font-semibold text-gray-700 border-b pb-2">
            <div className="col-span-2">Item</div>
            <div className="flex justify-between items-center">
              <span className="text-center w-1/3">Quantity</span>
              <span className="text-right w-1/3">Price</span>
              <span className="text-right w-1/3">Remove</span>
            </div>
          </div>

          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))}

          <CartSummary
            cartItems={cartItems}
            onContinueShopping={onContinueShopping}
          />
        </div>
      )}
    </div>
  );
};

