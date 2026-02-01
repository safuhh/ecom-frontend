import api from "../api/axios";
export const getcart = () => api.get("/cart");
export const addtocart = (productId, quantity = 1) =>
  api.post("/cart/add", { productId, quantity });
export const removecart = (productId) =>
  api.post("/cart/remove", { productId });
