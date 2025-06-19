// import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ProductList } from "./components/productList";
import { PRODUCTS } from "./products";

function App() {
  // return (
  //   <div className="App">
  //     <ShopContextProvider>
  //       <Router>
  //         <Navbar />
  //         <Routes>
  //           <Route path="/" element={<Shop />} />
  //           <Route path="/contact" element={<Contact />} />
  //           <Route path="/cart" element={<Cart />} />
  //         </Routes>
  //       </Router>
  //     </ShopContextProvider>
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <Header />
      <main>
        <ProductList products={PRODUCTS} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
