import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
//import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Profile from "./components/Profile.jsx";
import Cart from "./components/Cart.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Footer from "./components/Footer.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import Slider from "./components/Slider.jsx";
import CaddProduct from "./components/addProduct.jsx";
import { toast } from "react-toastify";

const App = () => {
  
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved).length : 0;
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCount(cart.length);
  }, [cart]);

  const addToCart = (product) => {
     try {
    const userId = localStorage.getItem("userId");

    const res =  axios.post(
      "http://localhost:4000/api/cart/add",
      {
        userId,
        productId: product.id
      }
    );
    setCount(prev => prev + 1);
    toast.success("Item added to cart 🛒");
  } catch (err) {
    console.error(err);
    toast.error("Error adding item to cart ❌");
  }
  };
  const handleDelete = (product) => {
  
    setCart((prev) => prev.filter((item) => item.id !== product.id));
    toast("Product removed from cart");
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/products/all");
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Navbar count={count} />
      <br />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <Product products={products} addToCart={addToCart} />
            </>
          }
        />
        <Route
          path="/product"
          element={<Product products={products} addToCart={addToCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/cart"
          element={
            <Cart cart={cart} setCart={setCart} handleDelete={handleDelete} />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/details"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route path="addProduct" element={<CaddProduct/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
