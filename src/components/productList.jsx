import { ProductCard } from "./productCard";

export const ProductList = ({ products, onAddToCart }) => {
  return (
    <section className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10 tracking-tight">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};