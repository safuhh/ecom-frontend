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
    <div className="min-h-screen bg-white px-4 py-10">
      <AdminNavbar />

      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Admin Orders</h2>

        {orders.map((o) => (
          <div
            key={o._id}
            className="border rounded-2xl p-6 shadow-sm space-y-4"
          >
            {/* BASIC INFO */}
            <div className="flex justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="text-sm font-medium break-all">{o._id}</p>

                <p className="mt-2 text-xs text-gray-500">User Email</p>
                <p className="text-sm font-medium">
                  {o.userId?.email || "Guest"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Total</p>
                <p className="text-xl font-bold">₹{o.totalAmount}</p>
              </div>

              <div>
                <select
                  value={o.orderStatus}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="border rounded-xl px-4 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

         
{o.address ? (
  <div className="bg-gray-50 p-4 rounded-xl">
    <p className="font-semibold mb-1">Delivery Address</p>
    <p className="text-sm">
      {o.address.fullName} <br />
      {o.address.street}, {o.address.city} <br />
      {o.address.state} - {o.address.pincode} <br />
       {o.address.phone}
    </p>
  </div>
) : (
  <div className="bg-yellow-50 p-4 rounded-xl text-sm text-yellow-700">
    ⚠️ Address not available (old / guest order)
  </div>
)}


            {/* PRODUCTS */}
            <div>
              <p className="font-semibold mb-2">Ordered Products</p>

              <div className="space-y-2">
                {o.products.map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border rounded-lg p-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.productId?.imageUrl}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {p.productId?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {p.quantity}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold">
                      ₹{p.productId?.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* PAYMENT */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>Payment: {o.paymentStatus}</span>
              <span>Refund: {o.refundStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;
