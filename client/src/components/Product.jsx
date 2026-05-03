import { useNavigate } from "react-router-dom";


export default function Product({ products, addToCart }) {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-10 text-gray-900 text-center">
          🛍️ Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id || product.id}
               
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col h-full"
            >
              <img
              onClick={() => navigate("/details", { state: product })}
                src={product.imageSrc || product.image}
                alt={product.imageAlt || product.name}
                className="w-full h-auto object-cover hover:scale-105 transition duration-300 "
              />

              <div className="p-5 flex flex-col gap-2 grow">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>

                {product.color && (
                  <p className="text-sm text-gray-500">{product.color}</p>
                )}

                {product.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <p className="text-blue-600 font-bold text-lg">
                  {typeof product.price === "number"
                    ? `$${product.price}`
                    : product.price}{" "}
                  dt
                </p>
                {token && (
                  <button 
                    onClick={() => addToCart(product)}
                    className="mt-auto w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-950 cursor-pointer transition font-semibold"
                  >
                    Add to Cart
                  </button>
                  
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
