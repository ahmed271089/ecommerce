import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar({count}) {
  const token = localStorage.getItem("token");
  const navigate=useNavigate()

  return (
    <nav className="bg-white shadow-md   w-full">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 onClick={()=>navigate("/")} className="text-xl font-bold text-blue-600" className="text-xl font-bold text-blue-600">
          MyShop
        </h1>

        {/* Middle links */}
        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/product">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Right side */}
        <div className="flex gap-4 items-center">

          {token ? (
            <>
              <Link to="/cart" className="hover:text-blue-500">
                🛒 Cart {count} Article
              </Link>

              <Link to="/profile" className="hover:text-blue-500">
                Profile
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-blue-500">
                Register
              </Link>

              <Link
                to="/login"
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
