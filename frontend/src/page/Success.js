import React from 'react';
import { useSelector } from 'react-redux';

const Success = () => {
  const cartItems = useSelector((state) => state.product.finalproduct);

  return (
    <div className="bg-green-200 w-full max-w-md m-auto p-4 rounded-md">
      <div className="flex justify-center items-center font-semibold text-lg mb-4">
        <p>Payment is Successful</p>
      </div>
      <div className="border-t border-gray-300 mt-4 pt-4">
        <h2 className="text-center font-bold mb-3">Ordered Items</h2>
        {cartItems.length > 0 ? (
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item.productId} className="flex justify-between items-center p-2 bg-white rounded-md shadow-md">
                <div className="flex items-center gap-2">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Category: {item.category}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Qty: {item.qty}</p>
                  <p className="text-sm text-gray-600">Total: ${item.total}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No items found in your cart.</p>
        )}
      </div>
    </div>
  );
};

export default Success;
