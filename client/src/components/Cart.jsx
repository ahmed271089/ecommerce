import { useMemo } from "react";

export default function Cart({ cart }) {

  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cart]);

  return (
    <div className="bg-blue-400 min-h-screen py-10 flex justify-center">
      <div className="bg-white w-[60vw] rounded-lg shadow-lg p-6">

        <h1 className="text-2xl font-bold mb-6 text-center">
          🛒 Your Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-center text-gray-500">Cart is empty</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-4 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <h4 className="text-blue-600 font-bold">
                    ${item.price}
                  </h4>
                </div>
              ))}
            </div>

            {/* TOTAL SECTION */}
            <div className="mt-6 border-t pt-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Total:</h2>
              <h2 className="text-xl font-bold text-blue-600">
                ${total}
              </h2>
            </div>
          </>
        )}
      </div>
    </div>
  );
}