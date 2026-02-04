import api from "../api/axios";

export const getDashboardStats = () => api.get("/admin/dashboard");

export const getAllOrders = () => api.get("/admin/management");
export const updateOrderStatus = (id, status) =>
  api.put(`/admin/management/${id}`, { status });

export const getMonthlyRevenue = () => {
  return api.get("/admin/monthly-revenue");
};
