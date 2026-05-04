import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Navbar({ count }) {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-white shadow-md fixed top_0 w-full h-[70px] z-1" >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          to="/"
          className="text-xl font-bold text-blue-600"
        >
          MyShop
        </h1>
        <div className="flex gap-6 items-center">
          <Link to="/">Home</Link>
          <Link to="/product">Products</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="flex gap-4 items-center">
          {token ? (
            <>
              <Link
                to="/cart"
                className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl text-white hover:opacity-80 transition w-fit"
              >
                <div className="relative text-lg">
                  🛒
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full min-w-[16px] text-center">
                    {count}
                  </span>
                </div>

              </Link>

              <Link to="/profile" className="hover:text-blue-500">
                Profile
              </Link>

              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                  toast("logout successful")
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
