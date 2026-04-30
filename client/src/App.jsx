import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Product from "./components/Product.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Profile from "./components/Profile.jsx";
import Cart from "./components/Cart.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Footer from "./components/Footer.jsx"


const App = () => {
const [products,setProducts]=useState([])
 const [cart, setCart] = useState([]);
 const [count,setCount]=useState(0)

const addToCart = (product) => {
  setCart((prev) => [...prev, product]);
  setCount(count + 1);
};
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/products/all');
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product products={products} addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;