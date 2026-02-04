import api from "../api/axios";

export const verifyPayment = (sessionId) =>
  api.post("/orders/verify-payment", {
    session_id: sessionId,
  });
export const getMyOrders = () => api.get("/orders/my-orders");

export const cancelOrder = (orderId) => api.put(`/orders/cancel/${orderId}`);
