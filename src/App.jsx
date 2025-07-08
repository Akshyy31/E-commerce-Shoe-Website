import {} from "lucide-react";
import "./App.css";
import Home from "./components/Home";
import {  Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductList from "./products/ProductList";
import ProductDetail from "./products/ProductDetail";
import Cart from "./Cart/Cart";

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
      </Routes>
    </div>
  );
}

export default App;
