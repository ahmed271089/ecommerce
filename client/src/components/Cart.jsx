import { useMemo, useState } from "react";
import { toast } from "react-toastify";

export default function Cart({ cart, handleDelete,setCart }) {
  const [showModal, setShowModal] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const [form, setForm] = useState({
    nom: "",
    adresse: "",
    telephone: "",
  });

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cart]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const { nom, adresse, telephone } = form;

    if (!nom || !adresse || !telephone) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    // 👉 validation
    setShowModal(false);
    setIsValidated(true);
    setCart([])
    toast("✅ Votre commande est validée !")
    
  };

  // 👉 SI VALIDÉ → afficher message
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
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-8 text-center">
          🛒 Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="flex flex-col gap-5">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between border p-4 rounded-lg">
                  <span>{item.name}</span>
                  <div className="flex gap-4">
                    <span>${item.price}</span>
                    <button onClick={() => handleDelete(item)}>✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t pt-6 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Total:</h2>
              <h2 className="text-2xl font-bold text-blue-600">${total}</h2>

              <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Valider
              </button>
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
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