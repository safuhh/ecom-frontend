import { useEffect, useState } from "react";
import { getMyOrders, cancelOrder } from "../api/orderApi";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.orders);
    } catch (err) {
      toast.error("Please login");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      toast.success("Order cancelled");
      fetchOrders();
    } catch (err) {
      toast.error("Cannot cancel order");
    }
  };

  if (orders.length === 0)
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-light tracking-widest uppercase text-gray-400">No orders yet</h2>
        <button className="mt-6 px-8 py-2 border border-black hover:bg-black hover:text-white transition-all duration-300 uppercase text-xs tracking-tighter">
          Start Shopping
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-6 pt-16">
        {/* Luxury Header */}
        <header className="mb-16 text-center">
          <h2 className="text-4xl font-light tracking-[0.2em] uppercase mb-2">My Orders</h2>
          <div className="h-px w-20 bg-black mx-auto"></div>
        </header>

        <div className="space-y-12">
          {orders.map((order) => (
            <div
              key={order._id}
              className="group border-b border-gray-100 pb-12 last:border-0"
            >
              {/* Order Meta Info */}
              <div className="flex flex-col md:flex-row md:justify-between mb-8 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Reference</p>
                  <p className="font-medium text-sm">#{order._id.toUpperCase()}</p>
                </div>
                
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Status</p>
                    <span className={`text-xs uppercase tracking-tighter font-semibold ${
                      order.orderStatus === "delivered" ? "text-emerald-600" : 
                      order.orderStatus === "cancelled" ? "text-rose-500" : "text-amber-600"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Total</p>
                    <p className="font-medium text-sm">₹{order.totalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 gap-6 mb-8">
                {order.products.map((item) => (
                  <div key={item._id} className="flex items-center gap-6">
                    <div className="relative overflow-hidden bg-gray-50 rounded-sm">
                      <img
                        src={item.productId?.imageUrl || "/placeholder.png"}
                        alt={item.productId?.name}
                        className="w-20 h-24 object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm uppercase tracking-tight font-medium text-slate-800">
                        {item.productId?.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 italic">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer of Order Card */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="text-xs text-gray-500 leading-relaxed max-w-xs">
                  <p className="uppercase tracking-widest text-[10px] text-gray-400 mb-2">Shipping To</p>
                  <span className="font-medium text-slate-700">{order.address?.fullName}</span><br />
                  {order.address?.street}, {order.address?.city} <br />
                  {order.address?.pincode}
                </div>

                {(order.orderStatus === "pending" || order.orderStatus === "processing") && (
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="text-[10px] uppercase tracking-[0.15em] font-semibold text-rose-400 hover:text-rose-600 transition-colors duration-300 underline underline-offset-8"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
