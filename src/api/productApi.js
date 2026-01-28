import api from "./Baseapi";

export const getproducts = () => api.get("/products");
export const getproduct = (id) => api.get(`/products/${id}`);
export const createproduct = (data) => api.post("/products", data);
export const updateproduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteproduct = (id) => api.delete(`/products/${id}`);
