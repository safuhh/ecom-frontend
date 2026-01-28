import { useState } from "react";
import { useDispatch } from "react-redux";
import {  toast } from "react-toastify";

import api from "../api/axios";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
 const navigate = useNavigate(); 
  const loginUser = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post("/user/login", { email, password });
    console.log(res.data);

    // Save user & token in Redux
    dispatch(
      loginSuccess({
        token: res.data.token,
        user: res.data.user,
      })
    );

    toast.success("Login successful");

    // Role-based redirect
    if (res.data.user.role === "admin") {
      navigate("/dashboard"); // Admin dashboard
    } else {
      navigate("/"); // Normal user home
    }
  } catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please enter your details to sign in.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={loginUser}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
              </div>
              <input
                type="password"
                required
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              Sign In
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button 
            onClick={() => navigate("/register")}
            className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
