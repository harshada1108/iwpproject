import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/admin/orders`);

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      const quantity = parseInt(item.quantity, 10);
      const price = parseFloat(item.productId.price);
      return total + (quantity * price);
    }, 0).toFixed(2);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-green-400 to-green-600">
        <div className="text-xl text-white animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gradient-to-r from-green-500 to-green-700 rounded-lg shadow-lg">
      <h1 className="text-4xl font-semibold text-center text-white mb-8 text-shadow-md">
        Admin Dashboard
      </h1>

      {orders.length > 0 ? (
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-lg">
          <table className="min-w-full table-auto border-collapse">
            <thead className="bg-gradient-to-r from-green-400 to-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">User</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Items</th>
                <th className="px-4 py-2 text-left">Total Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 transition-all duration-300 ease-in-out">
                  <td className="px-4 py-2 text-gray-600">{order._id}</td>
                  <td className="px-4 py-2 text-gray-600 flex items-center gap-3">
                    {/* User Image */}
                    {order.userId.image ? (
                      <img
                        src={order.userId.image}
                        alt={`${order.userId.firstName} ${order.userId.lastName}`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md transform hover:scale-110 transition-all duration-300 ease-in-out"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center">
                        <span className="text-white">N/A</span>
                      </div>
                    )}
                    {order.userId.firstName} {order.userId.lastName}
                  </td>
                  <td className="px-4 py-2 text-gray-600">{order.userId.email}</td>
                  <td className="px-4 py-2 text-gray-600">
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li key={index} className="flex items-center space-x-3 text-gray-500">
                          {/* Product Image */}
                          {item.productId.image ? (
                            <img
                              src={item.productId.image}
                              alt={item.productId.name}
                              className="w-12 h-12 object-cover rounded-md shadow-md transform hover:scale-110 transition-all duration-300 ease-in-out"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                              <span className="text-gray-500">No Image</span>
                            </div>
                          )}
                          <span>{item.productId.name} - Quantity: {item.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-2 text-gray-600">${calculateTotal(order.items)}</td>
                  <td className="px-4 py-2 text-gray-600">
                    <span className={`font-semibold ${order.status === 'Completed' ? 'text-green-500' : 'text-red-500'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500">No orders found</div>
      )}
    </div>
  );
};

export default AdminDashboard;
