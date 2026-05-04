import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CaddProduct() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/api/products/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Product added ✅");
      setForm({
        name: "",
        description: "",
        price: "",
        image: ""
      });

    } catch (err) {
      toast.error("Error adding product ❌");
    }
  };

  if (!token) {
    toast.warning("Unauthorized ❌");
    return (
      <p className="text-center text-gray-500">
        Login to add a product
      </p>
    );
  }

  return (
    <div className="bg-blue-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">
          🛍️ Add Product
        </h1>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

