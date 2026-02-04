import api from "../api/axios";

// single product
export const createCheckoutSession = (data) =>
  api.post("/stripe/create-checkout-session", data);
// cart
export const createCartCheckoutSession = (products) =>
  api.post("/stripe/create-checkout-session", { products });
