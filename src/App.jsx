import {} from "lucide-react";
import "./App.css";
import Home from "./components/Home";
import {  Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/ProductDetail";
import Cart from "./Cart/Cart";
import Checkout from "./components/CheckOut";
import Order from "./components/Order";

function App() {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/productlist" element={<ProductList/>} />
        <Route path="/product-detail/:id" element={<ProductDetail/>} />
        <Route path="/cartpage" element={<Cart/>} />
        <Route path="/check-out" element={<Checkout/>} />
        <Route path="/order-confirmation" element={<Order/>} />
      </Routes>
    </div>
  );
}

export default App;
