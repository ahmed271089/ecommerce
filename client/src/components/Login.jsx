import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const user = { email, password };

      const res = await axios.post(
        "http://localhost:4000/api/users/login",
        user,
      );

      console.log("Login successful", res.data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId",res.data.id)
      toast("login successful")
      navigate("/");
    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      toast("Invalid credentials");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-blue-500 min-h-screen flex justify-center items-center">
      <div className="bg-white w-[350] p-8 rounded-lg shadow-lg flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
          >
            Login
          </button>
          <Link
            to="/register"
            className="block text-center bg-blue-500 text-white px-4 py-2 rounded"
          >
            <p>Create an account</p>
          </Link>
        </form>
      </div>
    </div>
  );
}
