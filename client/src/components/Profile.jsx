import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      
      return;
    }

    axios
      .get("http://localhost:4000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to fetch user"),
      )
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

      <h2 className="text-2xl font-bold text-center mb-6">
        Profile
      </h2>

      {user ? (
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Name</p>
            <p className="font-semibold text-lg">{user.name}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-500 text-sm">Email</p>
            <p className="font-semibold text-lg">{user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No user logged in
        </p>
      )}
    </div>
  </div>
);
}
