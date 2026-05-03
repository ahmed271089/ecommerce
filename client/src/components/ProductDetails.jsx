import {  useLocation,useNavigate } from "react-router-dom";


const ProductDetails = ({ addToCart }) => {
  const { state: product } = useLocation();

  const navigate=useNavigate()

  return (
    <div className="p-10 flex flex-col md:flex-row gap-10 items-center">
      {/* Image */}
      <img
        className="w-full md:w-1/3 rounded-lg shadow-md"
        src={product.image || product.imageSrc}
        alt={product.name}
      />

      {/* Details */}
      <div className="flex flex-col gap-4 max-w-xl">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        <p className="text-gray-600">{product.description}</p>

        <p className="text-blue-600 font-bold text-2xl">{product.price} dt</p>
        <div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            onClick={addToCart}
          >
            Add to Cart
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out ml-3" onClick={()=>navigate('/product')}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
