import api from "../api/axios";

export const getproducts = (category, search) => {
  let url = "/products?";

  if (category) url += `category=${category}&`;
  if (search) url += `search=${search}&`;

  return api.get(url);
};


export const getproduct = (id) => api.get(`/products/${id}`);
export const createproduct = (data) => api.post("/products", data);
export const updateproduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteproduct = (id) => api.delete(`/products/${id}`);
