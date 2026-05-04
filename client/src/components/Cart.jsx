import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart({ setCart: setParentCart }) {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const userId = localStorage.getItem("userId");
  const API = "http://localhost:4000/api/cart";

  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    telephone: "",
  });

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API}/all?userId=${userId}`);
      setCart(res.data.cart || []);
    } catch (err) {
      console.error(err);
      toast.error("Error loading cart");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + item.quantity * Number(item.Product.price),
      0
    );
  }, [cart]);


  const removeItem = async (productId) => {
    try {
      await axios.post(`${API}/remove`, { userId, productId });
      toast.success("Item removed");
      fetchCart();
    } catch (err) {
      toast.error("Error removing item");
    }
  };


  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put(`${API}/update`, {
        userId,
        productId,
        quantity,
      });
      fetchCart();
    } catch (err) {
      toast.error("Error updating quantity");
    }
  };


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = () => {
    const { nom, adresse, telephone } = form;

    if (!nom || !adresse || !telephone) {
      toast.error("Veuillez remplir tous les champs !");
      return;
    }

    setShowModal(false);
    setIsValidated(true);


    setCart([]);
    if (setParentCart) setParentCart([]);

    toast.success("✅ Votre commande est validée !");
  };

  if (isValidated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-green-600">
          ✅ Votre commande est validée !
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 flex justify-center">
      <div className="bg-white w-[60vw] rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border p-4 rounded-lg"
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
                      {(item.quantity * item.Product.price).toFixed(2)} TND
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
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Total:</h2>
              <h2 className="text-xl font-bold text-blue-600">
                {total.toFixed(2)} TND
              </h2>

              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">

            <h2 className="text-xl font-bold mb-4 text-center">
              Informations de livraison
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="nom"
                placeholder="Nom"
                value={form.nom}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                name="adresse"
                placeholder="Adresse"
                value={form.adresse}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />

              <input
                type="text"
                name="telephone"
                placeholder="Téléphone"
                value={form.telephone}
                onChange={handleChange}
                className="border p-2 rounded-lg"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Annuler
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}