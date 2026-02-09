import axios from "axios";
import { store } from "../redux/store";
import { loginSuccess, logout } from "../redux/authSlice";

const api = axios.create({
  baseURL: "https://ecom-backend-9ok5.onrender.com/api",
  withCredentials: true,
});
const refreshApi = axios.create({
  baseURL: "https://ecom-backend-9ok5.onrender.com/api",
  withCredentials: true,
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (originalRequest.url.includes("/refresh-token")) {
        store.dispatch(logout());
        return Promise.reject(error);
      }

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
        const res = await refreshApi.post("/user/refresh-token");
        const newToken = res.data.token

        store.dispatch(
          loginSuccess({
            token: newToken,
            user: store.getState().auth.user,
          }),
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
  },
);
export default api;
