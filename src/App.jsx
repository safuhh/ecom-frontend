import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Home from "./components/Home";
import Dashboard from "./admin/Dashboard";
import ProductList from "./components/ProductList";
import SingleProduct from "./components/SingleProduct";
import Footer from "./components/Footer";
import AdminProducts from "./admin/AdminProducts";
import Cart from "./components/Cart";

export default function App() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/adminproduct" element={<AdminProducts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
