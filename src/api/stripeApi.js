import api from "../api/axios";

// single product
export const createCheckoutSession = (productId) =>
  api.post("/stripe/create-checkout-session", { productId });

// cart
export const createCartCheckoutSession = (products) =>
  api.post("/stripe/create-checkout-session", { products });
