import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart({ count }) {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");

  const API = "http://localhost:4000/api/cart";

  // 🟢 GET /all
  const fetchCart = async () => {
    const res = await axios.get(`${API}/all?userId=${userId}`);
    setCart(res.data.cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 💰 total
  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity * Number(item.Product.price),
      0,
    );
  }, [cart]);

  // ❌ POST /remove
  const removeItem = async (productId) => {
    await axios.post(`${API}/remove`, {
      userId,
      productId,
    });
    toast.success("item removed");
    fetchCart();
  };

  // 🔄 PUT /update
  const updateQuantity = async (productId, quantity) => {
    await axios.put(`${API}/update`, {
      userId,
      productId,
      quantity,
    });
    fetchCart();
  };

  return (
    <div className="bg-blue-400 min-h-screen py-10 flex justify-center">
      <div className="bg-white w-[60vw] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.Product.image}
                      alt={item.Product.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <h3 className="font-semibold">{item.Product.name}</h3>

                      <p className="text-gray-500 text-sm">
                        {item.Product.description}
                      </p>

                      {/* 🔢 Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="px-2 bg-gray-200 rounded"
                        >
                          -
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-2 bg-gray-200 rounded"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <h4 className="text-blue-600 font-bold">
                      {(item.quantity * item.Product.price).toFixed(3)} TND
                    </h4>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Total:</h2>
              <h2 className="text-xl font-bold text-blue-600">
                {total.toFixed(3)} TND
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
