import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../api/adminApi";
import AdminNavbar from "./AdminNavbar";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

const fetchOrders = async () => {
  try {
    const res = await getAllOrders();
    setOrders(res.data.orders);
  } catch (err) {
    console.error("Admin orders fetch failed", err);
  }
};


  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      fetchOrders();
    } catch (err) {
      console.error("Update status failed", err);
    }
  };

 return (
  <div className="min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-10">
    <AdminNavbar/>
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-gray-900 mb-8">
        Admin Orders
      </h2>

      <div className="space-y-6">
        {orders.map((o) => (
          <div
            key={o._id}
            className="rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition bg-white p-6"
          >
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              
              {/* Order Info */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  Order ID
                </p>
                <p className="text-sm font-medium text-gray-900 break-all">
                  {o._id}
                </p>

                <p className="text-sm text-gray-500 mt-3">
                  User
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {o.userId?.email || "Guest"}
                </p>
              </div>

              {/* Amount */}
              <div className="text-left lg:text-center">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ₹{o.totalAmount}
                </p>
              </div>

              {/* Status */}
              <div className="w-full lg:w-56">
                <p className="text-sm text-gray-500 mb-1">
                  Order Status
                </p>
                <select
                  value={o.orderStatus}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="w-full rounded-xl border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 border-t border-gray-100" />

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>Status updated by admin</span>
              <span className="font-medium text-gray-900">
                {o.orderStatus.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

};

export default AdminOrders;
