import axios from "axios";
import { store } from "../redux/store";
import { loginSuccess, logout } from "../redux/authSlice";

const api = axios.create({
  baseURL: "http://localhost:3033/api",
  withCredentials: true, // cookies included
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Invalid or expired token" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = "Bearer " + token;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
    
        const res = await api.get("/user/refresh-token");
        const newToken = res.data.token;

        store.dispatch(
          loginSuccess({
            token: newToken,
            user: store.getState().auth.user,
          })
        );

        processQueue(null, newToken);
        originalRequest.headers.Authorization = "Bearer " + newToken;

        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        store.dispatch(logout());
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
